const mongoose = require("mongoose");
const Product = require("./models/Product"); // Make sure the path is correct
require("dotenv").config();

// Sample products to be inserted into the database
const products = [
    { name: "Rice", price: 2.5, category: "Grains", imageUrl: "/path/to/image1.jpg" },
    { name: "Wheat", price: 1.8, category: "Grains", imageUrl: "/path/to/image2.jpg" },
    { name: "Red Lentils", price: 3.0, category: "Pulses", imageUrl: "/path/to/image3.jpg" },
    { name: "Chickpeas", price: 2.2, category: "Pulses", imageUrl: "/path/to/image4.jpg" },
    { name: "Shampoo", price: 5.0, category: "Personal Care", imageUrl: "/path/to/image5.jpg" },
    { name: "Toothpaste", price: 1.5, category: "Personal Care", imageUrl: "/path/to/image6.jpg" },
];

// Async function to seed the products
const seedProducts = async () => {
    try {
        // Connect to the database
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected");

        // Clear existing products and insert new ones
        await Product.deleteMany({}); // Clear existing data (optional)
        await Product.create(products); // Add new products

        console.log("Products added to the database");

        // Disconnect from the database
        mongoose.disconnect();
    } catch (err) {
        console.error("Error connecting to the database", err);
    }
};

// Run the seeding function
seedProducts();
