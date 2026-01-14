const jwt = require("jsonwebtoken");

/**
 * Generates JWT token
 * Token contains user ID
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
