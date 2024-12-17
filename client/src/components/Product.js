import React from "react";

const Product = ({ product }) => {
    return (
        <div className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>${product.price}</span>
        </div>
    );
};

export default Product;
