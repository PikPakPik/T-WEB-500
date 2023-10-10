const express = require("express");
const router = express.Router();

// Import controllers
const advertissementsController = require("../controllers/advertissements.controller");
const usersController = require("../controllers/users.controller");

// Define routes advertissements
router.get("/", advertissementsController.getAdvertissements);
router.get("/advert/:advertId", advertissementsController.getOneAdvertisement);

// Define routes users
router.post("/signup", usersController.createUser);

// Export router
module.exports = router;
