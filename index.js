const express = require("express");
const register = require("./api/register");
const login = require("./api/login");
const connectDB = require("./db/db");
const cors = require("cors");
const app = express();
const port = 5000;

// Connect to the database
connectDB();

app.use(cors());
// for handeling the json
app.use(express.json());

app.use("/register", register);
app.use("/login", login);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
