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

// Define routes applications
router.post("/application/:advertId", applicationController.applyToAdvert);
router.get("/application", applicationController.getUserApplications);

// Export router
module.exports = router;
