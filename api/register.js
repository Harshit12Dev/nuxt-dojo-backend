const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");

// Register endpoint
router.post("/", async (req, res) => {
  console.log("Api called");
  try {
    // Extract user data from request body
    const { username, email, password } = req.body;

    // Check if the username or email is already in use
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("error");
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
});

module.exports = router;
