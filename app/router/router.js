const express = require("express");
const router = express.Router();

// Import controllers
const advertissementsController = require("../controllers/advertissements.controller");

// Define routes
router.get("/", advertissementsController.getAdvertissements);
router.get("/:advertId", advertissementsController.getOneAdvertisement);

// Export router
module.exports = router;
