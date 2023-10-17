const datamapper = require("../models/superman.datamapper");
const loginService = require("../services/login.service");

const controller = {
  isSuperman: async (req, res) => {
    // Recup the userId from the token
    const token = req.headers.authorization?.replace("Bearer ", "");
    const user = loginService.getUser(token);
    try {
      const userId = user.id;

      // Get the user from the database
      const superman = await datamapper.getOneSuperman(userId);
      //Send the response
      res.json(superman);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = controller;
