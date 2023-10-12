const express = require("express");
const router = express.Router();

// Import controllers
const advertissementsController = require("../controllers/advertissements.controller");
const usersController = require("../controllers/users.controller");
const compagnyController = require("../controllers/company.controller");
const auth = require("../middleware/auth.middleware");
const applicationController = require("../controllers/applications.controller");

// Define routes advertissements
router.get("/", advertissementsController.getAdvertissements);
router.get("/advert/:advertId", advertissementsController.getOneAdvertisement);
router.get(
  "/advertCompany/:companyId",
  advertissementsController.getCompanyAdvertisements
);
router.post(
  "/advert",
  auth.isLogged,
  advertissementsController.createAdvertisement
);

// Define routes users
router.post("/signup", usersController.createUser);
router.post("/login", usersController.login);
router.get("/user/:userId", usersController.getOneUser);
router.get("/me", auth.isLogged, usersController.getMe);

// Define routes company
router.get("/company/:companyId", compagnyController.getOneCompany);

// Define routes applications
// router.post("/application", applicationController.createApplication);

// Export router
module.exports = router;
