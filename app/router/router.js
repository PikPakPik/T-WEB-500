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
router.post(
  "/advert/:advertId",
  auth.isLogged,
  advertissementsController.createJobInformation
);
router.put(
  "/jobInformation/:advertId",
  auth.isLogged,
  advertissementsController.updateAdvertisement
);
router.get(
  "/savedAdvert",
  auth.isLogged,
  advertissementsController.getSavedAdvert
);
router.get(
  "/appliedAdvert",
  auth.isLogged,
  advertissementsController.getAppliedAdvert
);
//TODO: finish this delete route
router.delete(
  "/advert/:advertId",
  auth.isLogged,
  advertissementsController.deleteAdvertisement
);

// Define routes users
router.post("/signup", usersController.createUser);
router.post("/login", usersController.login);
router.get("/user/:userId", usersController.getOneUser);
router.get("/me", auth.isLogged, usersController.getMe);
router.put("/user", auth.isLogged, usersController.updateUser);

// Define routes company
router.get("/company/:companyId", compagnyController.getOneCompany);
router.post("/company", compagnyController.createCompany);
router.put(
  "/company/:companyId",
  auth.isLogged,
  compagnyController.updateCompany
);

// Define routes applications
router.post("/application/:advertId", applicationController.applyToAdvert);

// Export router
module.exports = router;
