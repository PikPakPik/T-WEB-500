const datamapper = require("../models/superman.datamapper");
const loginService = require("../services/login.service");

const controller = {
  isSuperman: async (req, res) => {
    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);

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
