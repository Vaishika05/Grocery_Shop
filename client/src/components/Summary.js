// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const OrderSummaryPage = () => {
//     const [orderDetails, setOrderDetails] = useState(null);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchOrderDetails = async () => {
//             const token = localStorage.getItem("token");
//             const orderId = localStorage.getItem("orderId"); // Assuming you store the orderId after the purchase

//             if (!orderId) {
//                 setError("Order ID not found. Please try again.");
//                 return;
//             }

//             try {
//                 const response = await axios.get(`http://localhost:5000/api/order/${orderId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 setOrderDetails(response.data);
//             } catch (error) {
//                 console.error("Error fetching order details:", error);
//                 setError("Failed to fetch order details.");
//             }
//         };

//         fetchOrderDetails();
//     }, []);

//     const handleGoBack = () => {
//         navigate("/"); // Navigate back to the homepage or a different page
//     };

//     if (error) {
//         return <div>{error}</div>;
//     }

//     if (!orderDetails) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>Order Summary</h1>
//             <h3>Order ID: {orderDetails._id}</h3>
//             <h3>Status: {orderDetails.status}</h3>
//             <h3>Payment Status: {orderDetails.paymentStatus}</h3>
//             <div>
//                 <h4>Order Details:</h4>
//                 <ul>
//                     {orderDetails.products.map((item) => (
//                         <li key={item.productId._id}>
//                             <strong>{item.productId.name}</strong> - ${item.price} x {item.quantity}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <h3>Total Price: ${orderDetails.totalAmount}</h3>
//             <button onClick={handleGoBack}>Go Back to Home</button>
//         </div>
//     );
// };

// export default OrderSummaryPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Typography, Alert, List, ListItem, ListItemText, Divider } from "@mui/material";

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
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!orderDetails) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={4} maxWidth={600} mx="auto" border={1} borderRadius={2} borderColor="grey.300" boxShadow={3}>
            <Typography variant="h4" align="center" gutterBottom>
                Order Summary
            </Typography>
            <Typography variant="h6">Order ID: {orderDetails._id}</Typography>
            <Typography variant="h6">Status: {orderDetails.status}</Typography>
            <Typography variant="h6">Payment Status: {orderDetails.paymentStatus}</Typography>

            <Box mt={3}>
                <Typography variant="h5">Order Details:</Typography>
                <List>
                    {orderDetails.products.map((item) => (
                        <React.Fragment key={item.productId._id}>
                            <ListItem>
                                <ListItemText
                                    primary={item.productId.name}
                                    secondary={`Price: $${item.price} x Quantity: ${item.quantity}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Box>

            <Typography variant="h5" mt={2}>
                Total Price: ${orderDetails.totalAmount}
            </Typography>

            <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" color="primary" onClick={handleGoBack}>
                    Go Back to Home
                </Button>
            </Box>
        </Box>
    );
};

export default OrderSummaryPage;
