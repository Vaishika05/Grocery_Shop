const express = require("express");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Make sure you have the User model

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        // Hash password
        // const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: password });

        // Save user to the database
        await newUser.save();

        res.status(201).json({ success: true });
    } catch (error) {
        // console.log("ERRO/R is", error);
        res.status(500).json({ message: "Error registering user" });
    }
});
// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // const isMatch = await bcrypt.compare(password, user.password);
        if (password !== user.password) return res.status(400).json({ message: "Invalid credentials" });
        // console.log("USERRRR:", user);
        const token = jwt.sign(
            { userId: user._id }, // Include the userId here
            "GroceryShop", // Secret key
            { expiresIn: "1h" } // Expiration time
        );
        // console.log("User ID:", user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
