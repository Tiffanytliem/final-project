import React, { useEffect, useState, useContext } from 'react';
import AppContext from './AppContext.js';
import '../styles.css';

function Cart() {
  const [items, setItems] = useState([]);
  const [showCart, setShowCart] = useState(true);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/api/carts/${user.userId}/items`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchCartItems();
  }, [user.userId]); // use user.userId as dependency

  function handleSubtractQuantity() {
    console.log('Quantity subtracted');
  }

  function handleAddQuantity() {
    console.log('Quantity added');
  }

  const subtotal = items.length > 0 ? items[0].totalCartPrice.toFixed(2) : 0;

  if (!showCart) {
    return null;
  }

  return (
    <div className="cart-modal">
      <span className="bi bi-x" onClick={() => setShowCart(false)}></span>
      <br />
      <p className="cart-title">Cart</p>
      <br />
      <hr />

      {items.map((item) => (
        <div className="cart-row" key={item.itemId}>
          <div className="cart-column-image">
            <img className="cart-image" src={item.image} alt={item.name}></img>
          </div>
          <div className="cart-column-name">
            <div className="row">
              <p>{item.name}</p>
            </div>
            <div className="row">
              <p>${item.price.toFixed(2)}</p>
              <br />
              <br />
            </div>
            <div className="row-quantity">
              <p className="column-third" onClick={handleSubtractQuantity}>
                -
              </p>
              <p className="column-third">{item.quantity}</p>
              <p className="column-third" onClick={handleAddQuantity}>
                +
              </p>
            </div>
          </div>
          <div className="cart-column-fourth">
            <p>${item.totalPrice.toFixed(2)}</p>
          </div>
        </div>
      ))}
      <br />
      <hr />
      <p className="subtotal">Subtotal: ${subtotal}</p>

      <button className="check-out">Check out </button>
      <br />
    </div>
  );
}

export default Cart;
