const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// // Get all categories
// router.get("/categories", async (req, res) => {
//     try {
//         const categories = ["Grains", "Pulses", "Personal Care"];
//         res.status(200).json({ categories });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching categories" });
//     }
// });

// // Get products by category (dynamic route)
// router.get("/:category", async (req, res) => {
//     const { category } = req.params; // Extract the category from the URL
//     // console.log("Category:", category); // Log to debug
//     try {
//         const products = await Product.find({ category });
//         if (!products || products.length === 0) {
//             return res.status(404).json({ message: "No products found in this category" });
//         }
//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({ message: "Error fetching products" });
//     }
// });

router.get("/product", async (req, res) => {
    const { category, subCategory } = req.query;

    try {
        const filter = {};
        if (category) filter.category = category;
        if (subCategory) filter.subCategory = subCategory;

        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products" });
    }
});

module.exports = router;
