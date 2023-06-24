import React, { useEffect, useState, useContext } from 'react';
import AppContext from './AppContext.js';
import '../styles.css';

function Cart({ onClose }) {
  const [items, setItems] = useState([]);
  const { user } = useContext(AppContext);
  const [cartChange, setCartChange] = useState(false);

  console.log(items);

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
  }, [user.userId, cartChange]);

  async function handleReduceQuantity(item) {
    let cartItem = items.find((element) => element.itemId === item.itemId);
    let quantity = cartItem.quantity - 1;
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItem, quantity }),
    };
    await fetch('/api/cart-items', req);
    setCartChange(!cartChange);
  }

  async function handleAddQuantity(item) {
    let cartItem = items.find((element) => element.itemId === item.itemId);
    console.log(cartItem);
    let quantity = cartItem.quantity + 1;
    console.log(quantity);
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItem, quantity }),
    };
    await fetch('/api/cart-items', req);
    setCartChange(!cartChange);
  }

  // useEffect(() => {
  //   let updateCartPrice = async () => {
  //     const req = {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ cartId, totalCartPrice }),
  //   };
  //   await fetch('/api/cart-items', req);
  //   setCartChange(!cartChange);
  //   }
  // })

  const subtotal = items.length > 0 ? items[0].totalCartPrice.toFixed(2) : 0;

  let totalCartPrice2 = 0;
  items.map((item) => (totalCartPrice2 += item.totalPrice));

  console.log(totalCartPrice2);

  return (
    <div className="cart-modal">
      <span className="bi bi-x" onClick={onClose}></span>
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
              <p
                className="column-third symbol"
                onClick={() => {
                  handleReduceQuantity(item);
                }}>
                -
              </p>
              <p className="column-third">{item.quantity}</p>
              <p
                className="column-third symbol"
                onClick={() => {
                  handleAddQuantity(item);
                }}>
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
      <p className="subtotal">Subtotal: ${totalCartPrice2.toFixed(2)}</p>

      <button className="check-out">Check out</button>
      <br />
    </div>
  );
}

export default Cart;
