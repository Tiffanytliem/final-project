import 'dotenv/config';
import express from 'express';
import argon2 from 'argon2';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import ClientError from './lib/client-error.js';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/api/products', async (req, res, next) => {
  try {
    const sql = `
      SELECT
        "Products"."productId",
        "Products"."name",
        "Products"."price",
        ARRAY_AGG("Images"."image" ORDER BY "Images"."imageId") AS images
      FROM
        "Products"
      JOIN
        "Images"
      USING
        ("productId")
      GROUP BY
        "Products"."productId",
        "Products"."name",
        "Products"."price";
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/products/:productId', async (req, res, next) => {
  const productId = Number(req.params.productId);
  try {
    const sql = `
      SELECT
        "Products"."productId",
        "Products"."name",
        "Products"."price",
        "Products"."description",
        ARRAY_AGG("Images"."image" ORDER BY "Images"."imageId") AS images
      FROM
        "Products"
      JOIN
        "Images"
      USING
        ("productId")
      WHERE
        "productId" = $1
      GROUP BY
        "Products"."productId",
        "Products"."name",
        "Products"."price",
        "Products"."description"
    `;
    const result = await db.query(sql, [productId]);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ClientError(400, 'All fields are required');
    }
    const sql = `
      insert into "Users"
           ("emailAddress", "hashedPassword")
          values ($1, $2)
          returning *
          `;

    const hash = await argon2.hash(password);
    const result = await db.query(sql, [email, hash]);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId",
            "hashedPassword"
        from "Users"
        where "emailAddress" = $1
    `;
    const params = [email];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    const isMatching = await argon2.verify(hashedPassword, password);
    console.log(hashedPassword);
    console.log(await argon2.hash('password'));
    if (!isMatching) {
      throw new ClientError(401, 'wrong password');
    }
    const payload = { userId, email };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.post('/api/:userId/cart', async (req, res, next) => {
  const { userId, totalCartPrice } = req.body;
  try {
    const sql = `
      INSERT INTO "Carts"
      ("userId", "totalCartPrice")
      VALUES ($1, $2)
      RETURNING *;
      `;

    const params = [userId, totalCartPrice];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/cart-items', async (req, res, next) => {
  // console.log(req.body.product);
  console.log(req.body);
  const { productId, images, name, price } = req.body.product;
  const { userId } = req.body.user;
  const image = images[0];
  const quantity = 1;
  // const cartId = 1;
  const totalPrice = price * quantity;

  const cartId = await getOrCreateCart(userId);

  async function getOrCreateCart(userId) {
    // Start a transaction
    await db.query('BEGIN');

    try {
      // Check for an existing cart not associated with any order
      let sql = `
      SELECT "Carts"."cartId"
      FROM "Carts"
      LEFT JOIN "Orders"
      ON "Carts"."cartId" = "Orders"."cartId"
      WHERE "Carts"."userId" = $1
      AND "Orders"."cartId" IS NULL;
    `;
      const params = [userId];
      let result = await db.query(sql, params);

      if (result.rows.length) {
        // If a cart exists, return it
        return result.rows[0].cartId;
      } else {
        // Otherwise, create a new cart

        sql = `
        INSERT INTO "Carts" ("userId", "totalCartPrice")
        VALUES ($1, 0)
        RETURNING "cartId";
      `;

        result = await db.query(sql, params);

        // Commit the transaction
        await db.query('COMMIT');

        // Return the newly created cart
        return result.rows[0].cartId;
      }
    } catch (err) {
      // Rollback the transaction in case of any errors
      await db.query('ROLLBACK');
      throw err;
    }
  }

  try {
    const sql = `
      INSERT INTO "Cart Items"
      ("productId", "cartId", "image", "name", "quantity", "price", "totalPrice")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const params = [
      productId,
      cartId,
      image,
      name,
      quantity,
      price,
      totalPrice,
    ];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows);

    console.log(params);
    // Get the current totalCartPrice
    const sql2 = `
      SELECT "totalCartPrice"
      FROM "Carts"
      WHERE "cartId" = $1
      `;
    const result2 = await db.query(sql2, [cartId]);

    // Add the totalPrice of the new item to the current totalCartPrice
    const newTotalCartPrice = result2.rows[0].totalCartPrice + totalPrice;
    console.log(newTotalCartPrice);

    if (isNaN(newTotalCartPrice)) {
      throw new ClientError(400, 'Total price calculation error');
    }

    // Update the totalCartPrice in the Carts table
    const sql3 = `
      UPDATE "Carts"
      SET "totalCartPrice" = $1
      WHERE "cartId" = $2
      RETURNING *;
      `;
    const result3 = await db.query(sql3, [newTotalCartPrice, cartId]);
    console.log(result3);
  } catch (err) {
    next(err);
  }
});

app.get('/api/carts/:userId/items', async (req, res, next) => {
  const userId = Number(req.params.userId);
  try {
    const sql = `
      SELECT "Cart Items".*, "totalCartPrice"
      FROM "Carts"
      JOIN "Cart Items"
      ON "Carts"."cartId" = "Cart Items"."cartId"
      WHERE "Carts"."userId" = $1;
    `;
    const result = await db.query(sql, [userId]);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// app.get('/api/:userId/orders', async(req,res,next) => {
//   const userId = Number(req.params.userId);
//   try{
//     const sql = `
//       SELECT "cartId"
//       FROM "Orders"
//       WHERE "userId" = $1;
//     `;
//     const result = await db.query(sql,[userId]);
//     res.status(201).json(result.rows);
//   } catch (err) {
//     next(err);
//   }
// });

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
