const express = require("express");
const router = express.Router();

// Import controllers
const advertissementsController = require("../controllers/advertissements.controller");
const usersController = require("../controllers/users.controller");
const compagnyController = require("../controllers/company.controller");
const auth = require("../middleware/auth.middleware");

// Define routes advertissements
router.get("/", advertissementsController.getAdvertissements);
router.get("/advert/:advertId", advertissementsController.getOneAdvertisement);
router.get(
  "/advertCompany/:companyId",
  advertissementsController.getCompanyAdvertisements
);

// Define routes users
router.post("/signup", usersController.createUser);
router.post("/login", usersController.login);
router.get("/user/:userId", usersController.getOneUser);
router.get("/me", auth.isLogged, usersController.getMe);

// Define routes company
router.get("/company/:companyId", compagnyController.getOneCompany);

// Define routes applications
// router.post("/application", advertissementsController.getApplications);

// Export router
module.exports = router;
