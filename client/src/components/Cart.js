import React, { useEffect, useState } from 'react';

function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = /* the user ID goes here */;
      try {
        const response = await fetch(`/api/carts/${userId}/items`);
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
    <div>
      <h1>Your Cart</h1>
      {items.map(item => (
        <div key={item.itemId}>
          <h2>{item.name}</h2>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
          {/* add more fields as needed */}
        </div>
      ))}
    </div>
  );
}

export default Cart;
