const loginService = require("../services/login.service");
const datamapper = require("../models/superman.datamapper");

const authMiddleware = {
  // isLogged can verify if the user is logged in
  isLogged: (req, res, next) => {
    // Recup the token in the request header if there is one
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token)
      return res
        .status(401)
        .send("Veuillez vous connecter afin d'accéder a ces informations.");

    // We traduce the token into a JS object
    const verifiedToken = loginService.getUser(token);

    // Calculate the current date in seconds
    const now = Math.floor(Date.now() / 1000);

    // If the token is expired or if the userId is not the same as the one in the token we send an error
    if (now >= verifiedToken.exp)
      return res
        .status(401)
        .send("Veuillez vous connecter afin d'accéder a ces informations.");

    next();
  },

  // isSuperman can verify if the user is a superman
  isSuperman: async (req, res, next) => {
    //Recup the userId from the token
    const userId = await loginService.getUserId(req);

    // Get the user from the database
    const superman = await datamapper.getOneSuperman(userId);

    // If the user is not a superman we send an error
    if (!superman)
      return res
        .status(401)
        .send("Vous n'avez pas les droits pour accéder à cette page.");

    next();
  },
};

module.exports = authMiddleware;
