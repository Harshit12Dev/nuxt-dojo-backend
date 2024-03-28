const jwt = require("jsonwebtoken");

// Function to verify JWT token
const verifyToken = (token, publicKey) => {
  try {
    // Verify the JWT token using the provided public key
    const decoded = jwt.verify(token, publicKey);
    return decoded; // If the token is valid, return the decoded payload
  } catch (error) {
    // If verification fails (e.g., invalid signature or expired token), throw an error
    throw new Error("Invalid token");
  }
};

const checkTokenValidity = async (req, res, next) => {
  // Get the token from the request headers, cookies, or query parameters
  const token =
    req.headers.authorization || req.cookies.My_Cookie || req.query.token;

  console.log(token);
  const publicKey = process.env.JWT_SECRET_KEY;

  try {
    if (!token) {
      throw new Error("Token not provided");
    }

    // Verify the token
    const decodedToken = verifyToken(token, publicKey);

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const tokenExpiry = decodedToken.exp; // Expiry time from the token payload

    if (tokenExpiry - currentTime < 300) {
      // Issue a new token (refresh token) and send it in the response
      const refreshToken = jwt.sign(
        { userId: decodedToken.userId },
        privateKey,
        { expiresIn: "1h" }
      );
      res.cookie("jwt", refreshToken, { httpOnly: true }); // Set the new token in a cookie
    }

    // Pass the decoded token to the next middleware or route handler
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { checkTokenValidity };
