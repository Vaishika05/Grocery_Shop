const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: false },
    category: { type: String, enum: ["Grains & Pulses", "Personal Care"], required: true },
});

module.exports = mongoose.model("Product", productSchema);
