import React, { useEffect, useState, useContext } from 'react';
import AppContext from './AppContext.js';

function Cart() {
  const [items, setItems] = useState([]);
  const user = useContext(AppContext).user;

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
  }, []); // empty dependency array so this runs once on mount

  return (
    <div className="cart-modal show">
      <h1>Your Cart</h1>
      {items.map((item) => (
        <div key={item.itemId}>
          <h2>{item.name}</h2>
          <img src={item.image} alt={item.name}></img>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
          {/* add more fields as needed */}
        </div>
      ))}
    </div>
  );
}

export default Cart;
