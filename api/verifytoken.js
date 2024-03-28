const express = require("express");
const { checkTokenValidity } = require("../middleware/verifytoken");
const router = express.Router();

// Protected route requiring token validation and rotation
router.get("/", checkTokenValidity, (req, res) => {
  res.json({ message: "Authorized" });
});

module.exports = router;
