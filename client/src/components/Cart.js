import React, { useEffect, useState, useContext } from 'react';
import AppContext from './AppContext.js';
import '../styles.css';

function Cart() {
  const [items, setItems] = useState([]);
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
  }); // empty dependency array so this runs once on mount

  function handleSubtractQuantity() {
    console.log('Quantity subtracted');
  }

  function handleAddQuantity() {
    console.log('Quantity added');
  }

  return (
    <div className="cart-modal show">
      <span class="bi bi-x"></span>
      <br />
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

      {items.map((item) => (
        <p>Subtotal: ${item.totalCartPrice.toFixed(2)}</p>
      ))}
    </div>
  );
}
export default Cart;
