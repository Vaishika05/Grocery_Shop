import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [categories] = useState(["Grains", "Pulses", "Personal Care"]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [userId, setUserId] = useState(null);
    const [quantityInput, setQuantityInput] = useState({}); // Track quantity input for each product

    // Fetch the user ID from token
    useEffect(() => {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const userId = decoded.userId || decoded.sub || decoded.id;
        setUserId(userId);
    }, []);

    // Function to fetch products by category
    const fetchProducts = async (category) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${category}`);
            setProducts(response.data);
            setSelectedCategory(category);
        } catch (error) {
            console.error("Error fetching products:", error.response?.data?.message || error.message);
            setProducts([]);
        }
    };

    // Handle quantity input for specific product
    const handleQuantityChange = (productId, value) => {
        setQuantityInput((prev) => ({ ...prev, [productId]: value }));
    };

    // Add to cart function with quantity input
    const addToCart = async (productId, category) => {
        if (!userId) {
            alert("Please log in to add products to the cart.");
            return;
        }

        const enteredQuantity = parseFloat(quantityInput[productId]) || 1; // Default to 1
        if (enteredQuantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/cart/add", {
                userId,
                productId,
                quantity: enteredQuantity,
            });
            console.log("Product added to cart:", response.data);
            alert(`Added ${enteredQuantity} ${category === "Personal Care" ? "units" : "kgs"} to cart!`);
        } catch (error) {
            console.error("Error adding product to cart:", error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            <h1>Product Categories</h1>
            <div>
                {categories.map((category, index) => (
                    <button key={index} onClick={() => fetchProducts(category)}>
                        {category}
                    </button>
                ))}
            </div>

            <h2>{selectedCategory ? `Products in ${selectedCategory}` : "Select a Category"}</h2>
            <div>
                {products.length > 0 ? (
                    <ul>
                        {products.map((product) => (
                            <li key={product._id}>
                                <strong>{product.name}</strong> - ${product.price} <br />
                                <img src={product.imageUrl} alt={product.name} style={{ width: "100px" }} />
                                <br />
                                <label>
                                    {selectedCategory === "Personal Care" ? "Quantity (units):" : "Weight (kgs):"}
                                    <input
                                        type="number"
                                        min="0.1"
                                        step="0.1"
                                        placeholder={`Enter ${selectedCategory === "Personal Care" ? "units" : "kgs"}`}
                                        value={quantityInput[product._id] || ""}
                                        onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                        style={{ marginLeft: "10px", width: "80px" }}
                                    />
                                </label>
                                <br />
                                <button onClick={() => addToCart(product._id, selectedCategory)}>Add to Cart</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    selectedCategory && <p>No products available in this category.</p>
                )}
            </div>
            <div>
                <h2>View Cart</h2>
                <Link to="/cart">View Cart</Link>
            </div>
        </div>
    );
};

export default HomePage;
