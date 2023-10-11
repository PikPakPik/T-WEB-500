require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  // The function generates a JWT from the userId and the secret
  // The function also adds a validity period set by default to 1 hour
  async authentify(userId) {
    const token = await jwt.sign(
      {
        id: userId,
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );
    // We return the token
    return token;
  },
};
