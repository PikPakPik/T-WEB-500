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

  // The functions recup the user's data from the token
  getUser(token) {
    if (!token) {
      return null;
    }
    try {
      // We check and convert the token into a JS object
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (!user) {
        return null;
      }
      // We return the user's data to the controller
      return user;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
};
