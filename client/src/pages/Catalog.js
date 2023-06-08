import { useEffect, useState } from 'react';
import fetchCatalog from '../lib/api';
import './Catalog.css';
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
      <h1>Shop All</h1>
      <hr />
      <div className="row">
        {products?.map((product) => (
          <div key={product.productId} className="col-12 col-md-6 col-lg-4">
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
      <img src={image} className="image card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-secondary">{price}</p>
      </div>
    </Link>
  );
}
