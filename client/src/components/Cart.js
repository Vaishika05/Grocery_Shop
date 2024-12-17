import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    // Fetch cart items
    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in to view your cart.");
                return;
            }

            const decoded = jwtDecode(token);
            const userId = decoded.userId;

            const response = await axios.get("http://localhost:5000/api/cart/view", {
                params: { userId }, // Send userId as a query parameter
                headers: { Authorization: `Bearer ${token}` },
            });

            setCartItems(response.data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    // Remove product handler
    const handleRemove = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const userId = decoded.userId;

            await axios.post("http://localhost:5000/api/cart/remove", {
                userId,
                productId,
            });

            // Refresh cart after removal
            fetchCartItems();
        } catch (error) {
            console.error("Error removing product from cart:", error);
        }
    };

    // const updateQuantity = async (productId, action) => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         const response = await axios.post(
    //             "http://localhost:5000/api/cart/update",
    //             { productId, action }, // 'increase' or 'decrease'
    //             { headers: { Authorization: `Bearer ${token}` } }
    //         );
    //         setCartItems(response.data.products); // Update cart state
    //     } catch (error) {
    //         console.error("Error updating quantity:", error.response?.data?.message || error.message);
    //     }
    // };

    // Handle quantity input for specific product
    // Update quantity function
    const updateQuantity = async (productId, action) => {
        try {
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const userId = decoded.userId;

            // Get the current quantity for the product
            const currentQuantity = cartItems.find((item) => item.productId._id === productId)?.quantity || 1;

            // Determine new quantity
            const newQuantity = action === "increase" ? currentQuantity + 1 : currentQuantity - 1;

            // If the quantity is less than 1, don't allow decreasing
            if (newQuantity < 1) return;

            await axios.post(
                "http://localhost:5000/api/cart/update",
                { userId, productId, action: action }, // Action is 'increase' or 'decrease'
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Refresh cart after updating the quantity
            fetchCartItems();
        } catch (error) {
            console.error("Error updating quantity:", error.response?.data?.message || error.message);
        }
    };
    // const handleBuy = async () => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         const decoded = jwtDecode(token);
    //         const userId = decoded.userId;

    //         const response = await axios.post(
    //             "http://localhost:5000/api/order/buy",
    //             { userId },
    //             { headers: { Authorization: `Bearer ${token}` } }
    //         );

    //         alert("Order placed successfully!");
    //         // Redirect to the order summary or home page
    //     } catch (error) {
    //         console.error("Error placing order:", error);
    //         alert("Error placing order");
    //     }
    // };
    const handleBuy = () => {
        // Navigate to the confirmation page where they can review the order before confirming
        navigate("/confirmation");
    };

    // return (
    //     <div>
    //         <h1>Your Cart</h1>
    //         {cartItems.length === 0 ? (
    //             <p>Your cart is empty!</p>
    //         ) : (
    //             <div>
    //                 <ul>
    //                     {cartItems.map((item) => (
    //                         <li key={item.productId._id}>
    //                             <strong>{item.productId.name}</strong> - ${item.productId.price}
    //                             <p>Quantity: {item.quantity}</p>
    //                         </li>
    //                     ))}
    //                 </ul>
    //                 <button onClick={handleBuy}>Buy Now</button>
    //             </div>
    //         )}
    //     </div>
    // );

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                // <ul>
                //     {cartItems.map((item) => (
                //         <li key={item.productId._id}>
                //             <strong>{item.productId.name}</strong> - ${item.productId.price}
                //             <img src={item.productId.imageUrl} alt={item.productId.name} style={{ width: "100px" }} />
                //             <p>Quantity: {item.quantity}</p>
                //             <div>
                //                 <button onClick={() => updateQuantity(item.productId._id, "decrease")}>-</button>
                //                 <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                //                 <button onClick={() => updateQuantity(item.productId._id, "increase")}>+</button>
                //             </div>
                //             <button onClick={() => handleRemove(item.productId._id)}>Remove</button>
                //         </li>
                //     ))}
                // </ul>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.productId._id}>
                            <strong>{item.productId.name}</strong> - ${item.productId.price}
                            <img src={item.productId.imageUrl} alt={item.productId.name} style={{ width: "100px" }} />
                            <p>Quantity: {item.quantity}</p>
                            <div>
                                <button onClick={() => updateQuantity(item.productId._id, "decrease")}>-</button>
                                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.productId._id, "increase")}>+</button>
                            </div>
                            <button onClick={() => handleRemove(item.productId._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleBuy}>Buy Now</button>
        </div>
    );
};

export default CartPage;
