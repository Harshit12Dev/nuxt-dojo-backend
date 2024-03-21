// routes/login.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// Login endpoint
router.post("/", async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find user in the database by username
    const user = await User.findOne({ username });

    // If user not found, send error response
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Compare provided password with hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If passwords don't match, send error response
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // If authentication successful, generate JWT token
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    // Send token in the response
    res.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
