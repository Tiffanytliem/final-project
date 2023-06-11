import { useEffect, useState } from 'react';
import { fetchProduct } from '../lib/api';
import {Link, useParams} from 'react-router-dom'
import '../styles.css';

export default function ProductDetails() {
  const {productId} = useParams();
  console.log(useParams());
  console.log(productId);
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadProduct(productId) {
      try {
        const product = await fetchProduct(productId);
        setProduct(product);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadProduct(productId);
  }, [productId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {productId}: {error.message}
      </div>
    );
  }
  if (!product) return null;
  const { name, images, price, description} = product;
  return (
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
          </div>
          <div className="row">
            <div className="column-half">
              <img src={images[0]} alt={name} className="image" />
            </div>
            <div className="column-half">
              <h2>{name}</h2>
              <h4 className="text-secondary">{price}</h4>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
