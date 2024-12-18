// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { jwtDecode } from "jwt-decode";

// // const OrderConfirmationPage = () => {
// //     const [cartDetails, setCartDetails] = useState(null);
// //     const [error, setError] = useState(null);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchCartDetails = async () => {
// //             const token = localStorage.getItem("token");
// //             const decoded = jwtDecode(token);
// //             const userId = decoded.userId;

// //             try {
// //                 const response = await axios.get(`http://localhost:5000/api/order/confirmation/${userId}`, {
// //                     headers: { Authorization: `Bearer ${token}` },
// //                 });

// //                 setCartDetails(response.data);
// //             } catch (error) {
// //                 console.error("Error fetching cart details:", error);
// //                 setError("Failed to fetch cart details.");
// //             }
// //         };

// //         fetchCartDetails();
// //     }, []);

// //     const handleBuy = async () => {
// //         try {
// //             const token = localStorage.getItem("token");
// //             const decoded = jwtDecode(token);
// //             const userId = decoded.userId;

// //             const response = await axios.post(
// //                 "http://localhost:5000/api/order/buy",
// //                 { userId },
// //                 { headers: { Authorization: `Bearer ${token}` } }
// //             );
// //             const orderId = response.data.orderId;
// //             localStorage.setItem("orderId", orderId);

// //             alert("Order placed successfully!");
// //             navigate("/summary"); // Redirect to order summary page
// //         } catch (error) {
// //             console.error("Error placing order:", error);
// //             alert("Error placing order");
// //         }
// //     };

// //     const handleGoBack = () => {
// //         navigate("/cart"); // Go back to the cart page
// //     };

// //     if (error) {
// //         return <div>{error}</div>;
// //     }

// //     if (!cartDetails) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div>
// //             <h1>Order Confirmation</h1>
// //             <div>
// //                 <h3>Order Details</h3>
// //                 <ul>
// //                     {cartDetails.products.map((item) => (
// //                         <li key={item.productId._id}>
// //                             <strong>{item.productId.name}</strong> - ${item.price} x {item.quantity}
// //                         </li>
// //                     ))}
// //                 </ul>
// //                 <h3>Total Price: ${cartDetails.totalAmount}</h3>
// //             </div>

// //             <div>
// //                 <button onClick={handleBuy}>Confirm Purchase</button>
// //                 <button onClick={handleGoBack}>Go Back to Cart</button>
// //             </div>
// //         </div>
// //     );
// // };

// // export default OrderConfirmationPage;

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
//             const orderId = response.data.order._id; // Correctly accessing the orderId
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
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode
import { Box, Button, Typography, CircularProgress, Alert, List, ListItem, ListItemText, Divider } from "@mui/material";

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
        return (
            <Box p={3}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!cartDetails) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={3} maxWidth="600px" mx="auto">
            <Typography variant="h4" component="h1" gutterBottom>
                Order Confirmation
            </Typography>

            <Box mb={3}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Order Details
                </Typography>
                <List>
                    {cartDetails.products.map((item, index) => (
                        <React.Fragment key={item.productId._id || index}>
                            {" "}
                            {/* Use index if _id is not available */}
                            <ListItem>
                                <ListItemText
                                    primary={`${item.productId.name}`}
                                    secondary={`$${item.price} x ${item.quantity}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>

                <Typography variant="h6" mt={2}>
                    Total Price: ${cartDetails.totalAmount}
                </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={handleBuy}>
                    Confirm Purchase
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleGoBack}>
                    Go Back to Cart
                </Button>
            </Box>
        </Box>
    );
};

export default OrderConfirmationPage;
