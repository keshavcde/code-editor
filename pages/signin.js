const express = require("express");
const signin = express.Router();
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { Signup } = require("../db"); // Your MongoDB model

const JWT_SECRET = "your_secret_key"; // Store in .env for security

// 🔹 Zod Schema Validation
const zodsignin = z.object({
    email: z.string().email(),
    password: z.string()
});

// 🔹 Sign-In Route
signin.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    // Validate Input with Zod
    const validation = zodsignin.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ msg: "Invalid inputs" });
    }

    try {
        // Check if user exists and password matches (NO HASHING)
        const user = await Signup.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ msg: "Sign-in successful", token });
    } catch (error) {
        console.error("Sign-in error:", error);
        return res.status(500).json({ msg: "Server error" });
    }
});

module.exports = { signin };
