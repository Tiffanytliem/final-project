import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';

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
        "Products"."name",
        "Products"."price",
        "Images"."image"
      FROM
        "Products"
      JOIN
        "Images"
      USING
        ("productId");
    `;
    const result = await db.query(sql);

    // post-processing
    const productMap = {};
    result.rows.forEach((row) => {
      // if the product is not yet in the map, add it
      if (!productMap[row.name]) {
        productMap[row.name] = {
          name: row.name,
          price: row.price,
          images: [row.image],
        };
      }
      // otherwise, just append the image
      else {
        productMap[row.name].images.push(row.image);
      }
    });
    // convert map to array
    const productsArray = Object.values(productMap);
    res.json(productsArray);
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
