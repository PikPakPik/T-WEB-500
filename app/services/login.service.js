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

  // La fonction permet de récupérer les données utilisateur à partir du token
  getUser(token) {
    if (!token) {
      return null;
    }
    try {
      // On vérifie et convertit le token en objet JS
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (!user) {
        return null;
      }
      // On renvoie au contrôleur l'objet contenant les infos
      return user;
    } catch (err) {
      console.error(err);
      return err;
    }
  },
};
