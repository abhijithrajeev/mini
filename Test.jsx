import React from 'react';

const Test = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <div className="product-details">
        <span className="price">${product.price}</span>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default Test;
