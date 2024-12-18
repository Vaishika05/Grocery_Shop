// const express = require("express");
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");
// const Order = require("../models/Order");

// const router = express.Router();

// // Buy products (place an order)
// router.post("/buy", async (req, res) => {
//     const { userId } = req.body;

//     try {
//         // Fetch the user's cart
//         const cart = await Cart.findOne({ userId });
//         if (!cart || cart.products.length === 0) {
//             return res.status(400).json({ message: "Your cart is empty" });
//         }

//         // Calculate total amount
//         let totalAmount = 0;
//         cart.products.forEach((item) => {
//             totalAmount += item.price * item.quantity;
//         });

//         // Create the order
//         const order = new Order({
//             userId: userId,
//             products: cart.products,
//             totalAmount,
//             status: "pending", // You can change this later to "completed" after payment
//             paymentStatus: "unpaid", // Set this to "paid" once payment is successful
//         });
//         await order.save();

//         // Clear the cart after order is placed
//         cart.products = [];
//         await cart.save();

//         // Simulate successful payment (for simplicity)
//         order.paymentStatus = "paid";
//         order.status = "completed";
//         await order.save();

//         // Send order confirmation
//         res.status(200).json({
//             message: "Order placed successfully",
//             order,
//         });
//     } catch (error) {
//         console.error("Error placing order:", error);
//         res.status(500).json({ message: "Error placing order" });
//     }
// });
// // Fetch the cart details for confirmation
// router.get("/confirmation/:userId", async (req, res) => {
//     const { userId } = req.params;

//     try {
//         // Fetch the cart details
//         const cart = await Cart.findOne({ userId });
//         if (!cart || cart.products.length === 0) {
//             return res.status(400).json({ message: "Your cart is empty" });
//         }

//         // Calculate the total amount
//         let totalAmount = 0;
//         cart.products.forEach((item) => {
//             totalAmount += item.price * item.quantity;
//         });

//         // Send cart details and total amount
//         res.status(200).json({ products: cart.products, totalAmount });
//     } catch (error) {
//         console.error("Error fetching cart:", error);
//         res.status(500).json({ message: "Error fetching cart details" });
//     }
// });

// module.exports = router;

const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

const router = express.Router();

// Buy products (place an order)
router.post("/buy", async (req, res) => {
    const { userId } = req.body;

    try {
        // Fetch the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        // Calculate total amount
        let totalAmount = 0;
        cart.products.forEach((item) => {
            totalAmount += item.price * item.quantity;
        });

        // Create the order
        const order = new Order({
            userId: userId,
            products: cart.products,
            totalAmount,
            status: "pending", // You can change this later to "completed" after payment
            paymentStatus: "unpaid", // Set this to "paid" once payment is successful
        });
        await order.save();

        // Clear the cart after order is placed
        cart.products = [];
        await cart.save();

        // Simulate successful payment (for simplicity)
        order.paymentStatus = "paid";
        order.status = "completed";
        await order.save();

        // Send order confirmation
        res.status(200).json({
            message: "Order placed successfully",
            order, // Return the order object with the _id
        });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Error placing order" });
    }
});

// Fetch the cart details for confirmation
router.get("/confirmation/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch the cart details
        const cart = await Cart.findOne({ userId }).populate("products.productId");
        // console.log("Received userId:", userId);
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        // Calculate the total amount
        let totalAmount = 0;
        cart.products.forEach((item) => {
            totalAmount += item.price * item.quantity;
        });

        // Send cart details and total amount
        res.status(200).json({ products: cart.products, totalAmount });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Error fetching cart details" });
    }
});

// Fetch order details by orderId
router.get("/:orderId", async (req, res) => {
    const { orderId } = req.params;

    try {
        // Find the order by its ID
        const order = await Order.findById(orderId).populate("products.productId"); // Assuming you need product details
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Send order details
        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Error fetching order details" });
    }
});

module.exports = router;
