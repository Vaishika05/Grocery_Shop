// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const OrderConfirmationPage = () => {
//     const [cartDetails, setCartDetails] = useState(null);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCartDetails = async () => {
//             const token = localStorage.getItem("token");
//             const decoded = jwtDecode(token);
//             const userId = decoded.userId;

//             try {
//                 const response = await axios.get(`http://localhost:5000/api/order/confirmation/${userId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 setCartDetails(response.data);
//             } catch (error) {
//                 console.error("Error fetching cart details:", error);
//                 setError("Failed to fetch cart details.");
//             }
//         };

//         fetchCartDetails();
//     }, []);

//     const handleBuy = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const decoded = jwtDecode(token);
//             const userId = decoded.userId;

//             const response = await axios.post(
//                 "http://localhost:5000/api/order/buy",
//                 { userId },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             const orderId = response.data.orderId;
//             localStorage.setItem("orderId", orderId);

//             alert("Order placed successfully!");
//             navigate("/summary"); // Redirect to order summary page
//         } catch (error) {
//             console.error("Error placing order:", error);
//             alert("Error placing order");
//         }
//     };

//     const handleGoBack = () => {
//         navigate("/cart"); // Go back to the cart page
//     };

//     if (error) {
//         return <div>{error}</div>;
//     }

//     if (!cartDetails) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>Order Confirmation</h1>
//             <div>
//                 <h3>Order Details</h3>
//                 <ul>
//                     {cartDetails.products.map((item) => (
//                         <li key={item.productId._id}>
//                             <strong>{item.productId.name}</strong> - ${item.price} x {item.quantity}
//                         </li>
//                     ))}
//                 </ul>
//                 <h3>Total Price: ${cartDetails.totalAmount}</h3>
//             </div>

//             <div>
//                 <button onClick={handleBuy}>Confirm Purchase</button>
//                 <button onClick={handleGoBack}>Go Back to Cart</button>
//             </div>
//         </div>
//     );
// };

// export default OrderConfirmationPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const OrderConfirmationPage = () => {
    const [cartDetails, setCartDetails] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartDetails = async () => {
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const userId = decoded.userId;

            try {
                const response = await axios.get(`http://localhost:5000/api/order/confirmation/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setCartDetails(response.data);
            } catch (error) {
                console.error("Error fetching cart details:", error);
                setError("Failed to fetch cart details.");
            }
        };

        fetchCartDetails();
    }, []);

    const handleBuy = async () => {
        try {
            const token = localStorage.getItem("token");
            const decoded = jwtDecode(token);
            const userId = decoded.userId;

            const response = await axios.post(
                "http://localhost:5000/api/order/buy",
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const orderId = response.data.order._id; // Correctly accessing the orderId
            localStorage.setItem("orderId", orderId);

            alert("Order placed successfully!");
            navigate("/summary"); // Redirect to order summary page
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error placing order");
        }
    };

    const handleGoBack = () => {
        navigate("/cart"); // Go back to the cart page
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!cartDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Order Confirmation</h1>
            <div>
                <h3>Order Details</h3>
                <ul>
                    {cartDetails.products.map((item) => (
                        <li key={item.productId._id}>
                            <strong>{item.productId.name}</strong> - ${item.price} x {item.quantity}
                        </li>
                    ))}
                </ul>
                <h3>Total Price: ${cartDetails.totalAmount}</h3>
            </div>

            <div>
                <button onClick={handleBuy}>Confirm Purchase</button>
                <button onClick={handleGoBack}>Go Back to Cart</button>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
