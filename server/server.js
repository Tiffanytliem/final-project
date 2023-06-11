import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
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

app.get('/api/products/:productId', async(req, res,next) => {
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
