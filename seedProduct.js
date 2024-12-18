const mongoose = require("mongoose");
const Product = require("./models/Product"); // Adjust the path as needed
require("dotenv").config();
const seedProducts = async () => {
    const products = [
        // Daily Staples - Grains
        {
            name: "Wheat",
            price: 40,
            imageUrl: "C:UsersVaishika AgrawalDesktopAIDSWebDevGroceryShopclientpublicimageswheat.jpg",
            description: "Premium quality wheat grains.",
            category: "Daily Staples",
            subCategory: "Grains",
            stock: 100,
            unit: "kg",
        },
        {
            name: "Juwar",
            price: 50,
            imageUrl: "https://example.com/images/juwar.jpg",
            description: "Rich in fiber and gluten-free Juwar.",
            category: "Daily Staples",
            subCategory: "Grains",
            stock: 200,
            unit: "kg",
        },
        {
            name: "Bajara",
            price: 45,
            imageUrl: "https://example.com/images/bajara.jpg",
            description: "Organic Bajara with high nutritional value.",
            category: "Daily Staples",
            subCategory: "Grains",
            stock: 150,
            unit: "kg",
        },
        // Daily Staples - Pulses
        {
            name: "Moong Dal",
            price: 70,
            imageUrl: "https://example.com/images/moong-dal.jpg",
            description: "High-quality Moong Dal for everyday cooking.",
            category: "Daily Staples",
            subCategory: "Pulses",
            stock: 300,
            unit: "kg",
        },
        {
            name: "Tuver Dal",
            price: 80,
            imageUrl: "https://example.com/images/tuver-dal.jpg",
            description: "Fresh and nutritious Tuver Dal.",
            category: "Daily Staples",
            subCategory: "Pulses",
            stock: 250,
            unit: "kg",
        },
        // Daily Staples - Edible Oils
        {
            name: "Olive Oil",
            price: 500,
            imageUrl: "https://example.com/images/olive-oil.jpg",
            description: "Extra virgin olive oil for healthy cooking.",
            category: "Daily Staples",
            subCategory: "Edible Oils",
            stock: 100,
            unit: "litre",
        },
        {
            name: "Mustard Oil",
            price: 180,
            imageUrl: "https://example.com/images/mustard-oil.jpg",
            description: "Pure mustard oil for flavorful cooking.",
            category: "Daily Staples",
            subCategory: "Edible Oils",
            stock: 200,
            unit: "litre",
        },
        // Snacks and Beverages
        {
            name: "Potato Chips",
            price: 20,
            imageUrl: "https://example.com/images/chips.jpg",
            description: "Crispy potato chips for snacking.",
            category: "Snacks and Beverages",
            subCategory: "Snacks",
            stock: 500,
            unit: "unit",
        },
        {
            name: "Orange Juice",
            price: 120,
            imageUrl: "https://example.com/images/orange-juice.jpg",
            description: "Freshly squeezed orange juice.",
            category: "Snacks and Beverages",
            subCategory: "Beverages",
            stock: 300,
            unit: "litre",
        },
        // Personal Care
        {
            name: "Shampoo",
            price: 250,
            imageUrl: "https://example.com/images/shampoo.jpg",
            description: "Herbal shampoo for smooth and shiny hair.",
            category: "Personal Care",
            subCategory: "Hair Care",
            stock: 200,
            unit: "unit",
        },
        {
            name: "Soap",
            price: 40,
            imageUrl: "https://example.com/images/soap.jpg",
            description: "Moisturizing soap for soft skin.",
            category: "Personal Care",
            subCategory: "Skin Care",
            stock: 400,
            unit: "unit",
        },
    ];

    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected");

        await Product.deleteMany(); // Clear existing products
        await Product.insertMany(products);
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedProducts();
