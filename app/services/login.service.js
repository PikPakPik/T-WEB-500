require("dotenv").config();
const { header } = require("express/lib/request");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");

const loginService = {
  // The function generates a JWT from the userId and the secret
  // The function also adds a validity period set by default to 1 hour
  authentify: async (userId) => {
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
  getUser: (token) => {
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

  getUserId: async function (req) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      const user = await this.getUser(token);
      return user.id;
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  },
};
module.exports = loginService;
