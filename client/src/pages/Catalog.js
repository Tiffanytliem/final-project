import { useEffect, useState } from 'react';
import fetchCatalog from '../lib/api';
import '../styles.css';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const [products, setProducts] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function loadCatalog() {
      try {
        const products = await fetchCatalog();
        setProducts(products);
      } catch (err) {
        setError(err);
      }
    }
    loadCatalog();
  }, []);

  if (error) return <div>ErrorLoading Catalog: {error.message}</div>;
  return (
    <div className="container">
      <div className="row">
        <div className="catalog-intro column-full">
          <h2 className="shop-all">Shop All</h2>
          <div className="catalog-desc">
            <p>A collection of items that enhance your everyday routine.</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        {products?.map((product) => (
          <div key={product.productId} className="column-half">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Product({ product }) {
  const { productId, name, price } = product;
  const image = product.images[0];
  console.log(product);
  return (
    <Link to={`details/${productId}`}>
      <div>
        <img src={image} className="image" alt={name} />
        <div className="card-body">
          <p>{name}</p>
          <p className="card-price">{price}</p>
        </div>
      </div>
    </Link>
  );
}
