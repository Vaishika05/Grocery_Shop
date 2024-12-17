import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderSummaryPage = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const token = localStorage.getItem("token");
            const orderId = localStorage.getItem("orderId"); // Assuming you store the orderId after the purchase

            if (!orderId) {
                setError("Order ID not found. Please try again.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/api/order/${orderId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setOrderDetails(response.data);
            } catch (error) {
                console.error("Error fetching order details:", error);
                setError("Failed to fetch order details.");
            }
        };

        fetchOrderDetails();
    }, []);

    const handleGoBack = () => {
        navigate("/"); // Navigate back to the homepage or a different page
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Order Summary</h1>
            <h3>Order ID: {orderDetails._id}</h3>
            <h3>Status: {orderDetails.status}</h3>
            <h3>Payment Status: {orderDetails.paymentStatus}</h3>
            <div>
                <h4>Order Details:</h4>
                <ul>
                    {orderDetails.products.map((item) => (
                        <li key={item.productId._id}>
                            <strong>{item.productId.name}</strong> - ${item.price} x {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <h3>Total Price: ${orderDetails.totalAmount}</h3>
            <button onClick={handleGoBack}>Go Back to Home</button>
        </div>
    );
};

export default OrderSummaryPage;
