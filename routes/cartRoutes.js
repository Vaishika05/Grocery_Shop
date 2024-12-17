const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// Add a product to the cart
// Add a product to the cart
router.post("/add", async (req, res) => {
    const { userId, productId, quantity } = req.body; // Accept quantity from the frontend

    try {
        // Find the product
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Find or create a cart for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        // Check if product already exists in the cart
        const existingProduct = cart.products.find((p) => p.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity; // Increment the quantity/weight
        } else {
            cart.products.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: quantity, // Set the quantity based on input
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding product to cart" });
    }
});

// Fetch cart items for a user
router.get("/view", async (req, res) => {
    const { userId } = req.query; // Correctly fetch userId from query params

    try {
        // Find the cart for the specific user and populate 'products.productId'
        const cart = await Cart.findOne({ userId }).populate("products.productId");

        if (!cart) {
            return res.json([]); // Return empty cart if no cart exists
        }

        res.json(cart.products); // Return the products array
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ message: "Error fetching cart items" });
    }
});

// Remove a product from the cart
router.post("/remove", async (req, res) => {
    const { userId, productId } = req.body;

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Filter out the product to remove it
        cart.products = cart.products.filter((product) => product.productId.toString() !== productId);

        await cart.save();
        res.status(200).json({ success: true, message: "Product removed from cart", cart });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ message: "Error removing product from cart" });
    }
});

// Update cart (increase or decrease product quantity)
router.post("/update", async (req, res) => {
    const { userId, productId, action } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const product = cart.products.find((p) => p.productId.toString() === productId);
        if (!product) return res.status(404).json({ message: "Product not found in cart" });

        // Handle quantity update
        if (action === "increase") {
            product.quantity += 1; // Increase quantity
        } else if (action === "decrease" && product.quantity > 1) {
            product.quantity -= 1; // Decrease quantity
        }

        // Save updated cart
        await cart.save();

        res.json({ products: cart.products }); // Send updated cart products
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
