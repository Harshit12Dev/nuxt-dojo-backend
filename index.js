const express = require("express");
const register = require("./api/register");
const login = require("./api/login");
const connectDB = require("./db/db");
const cors = require("cors");
const verifyToken = require("./api/verifytoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const port = 5000;

// Connect to the database
connectDB();

app.use(cors());
// for handeling the json
app.use(cookieParser());
app.use(express.json());

app.use("/register", register);
app.use("/login", login);
app.use("/verifytoken", verifyToken);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
