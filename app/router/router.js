const express = require("express");
const router = express.Router();

// Import controllers
const advertissementsController = require("../controllers/advertissements.controller");
const usersController = require("../controllers/users.controller");
const compagnyController = require("../controllers/company.controller");

// Define routes advertissements
router.get("/", advertissementsController.getAdvertissements);
router.get("/advert/:advertId", advertissementsController.getOneAdvertisement);
router.get(
  "/advertCompany/:companyId",
  advertissementsController.getCompanyAdvertisements
);

// Define routes users
router.post("/signup", usersController.createUser);

// Define routes company
router.get("/company/:companyId", compagnyController.getOneCompany);

// Export router
module.exports = router;
