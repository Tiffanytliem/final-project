import { useEffect, useState, useContext } from 'react';
import { fetchProduct } from '../lib/api';
import { Link, useParams } from 'react-router-dom';
import '../styles.css';
import Footer from '../components/Footer';
import AppContext from '../components/AppContext';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';

export default function ProductDetails() {
  const { productId } = useParams();
  console.log(useParams());
  console.log(productId);
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [error, setError] = useState();
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

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

  async function handleAddToCart() {
    if (!user) {
      navigate('/account');
    } else {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product, user }),
      };
      await fetch('/api/cart-items', req);
      setShowCart(true);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {productId}: {error.message}
      </div>
    );
  }
  if (!product) return null;
  const { name, images, price, description } = product;
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="img-col-2-thrd">
            <div className="row">
              <img src={images[0]} alt={name} className="image" />
            </div>
            {/* <div className="row">
            <div className="img-col-1-fifth">
              <img src={images[1]} alt={name} className="image" />
            </div>
            <div className="img-col-1-fifth">
              <img src={images[2]} alt={name} className="image" />
            </div>
            <div className="img-col-1-fifth">
              <img src={images[3]} alt={name} className="image" />
            </div>
            <div className="img-col-1-fifth">
              <img src={images[4]} alt={name} className="image" />
            </div>
          </div> */}
          </div>
          <div className="desc-col-1-thrd">
            <div className="row">
              <p className="detail-title">{name}</p>
            </div>
            <div className="row">
              <p className="detail-price">${price.toFixed(2)}</p>
            </div>
            <div className="row">
              <button onClick={handleAddToCart} className="add-to-cart">
                Add to Cart
              </button>
            </div>
            <div className="row">
              <p className="detail-desc">{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cart-container">{showCart === true && <Cart />}</div>
      <div className="row hr-footer">
        <Footer />
      </div>
    </div>
  );
}
