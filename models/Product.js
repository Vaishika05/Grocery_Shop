const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Daily Staples", "Snacks and Beverages", "Dry Fruits", "Personal Care"],
    },
    subCategory: {
        type: String,
        required: true,
        enum: [
            "Grains",
            "Pulses",
            "Edible Oils",
            "Snacks",
            "Beverages",
            "Hair Care",
            "Skin Care",
            "",
            // Subcategories of Daily Staples
            // "Wheat",
            // "Juwar",
            // "Bajara", // Subcategories under Grains
            // "Moong Dal",
            // "Tuver Dal", // Subcategories under Pulses
            // "Olive Oil",
            // "Mustard Oil", // Subcategories under Edible Oils
            // Add subcategories for other main categories as needed
        ],
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    unit: {
        type: String,
        required: true,
        enum: ["kg", "litre", "unit"], // Define units based on your requirements
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);
