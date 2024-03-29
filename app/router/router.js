const express = require("express");
const router = express.Router();

// Import controllers
const advertissementsController = require("../controllers/advertissements.controller");
const usersController = require("../controllers/users.controller");
const compagnyController = require("../controllers/company.controller");
const auth = require("../middleware/auth.middleware");
const applicationController = require("../controllers/applications.controller");
const supermanController = require("../controllers/superman.controller");

//! Define routes advertissements

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
  "/advert/:advertId/save",
  auth.isLogged,
  advertissementsController.isJobInformationExist
);
router.put(
  "/jobInformation/:advertId",
  auth.isLogged,
  advertissementsController.isJobInformationExist
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
router.put(
  "/advert/:advertId",
  auth.isLogged,
  advertissementsController.updateAdvertisement
);
router.delete(
  "/advert/:advertId",
  auth.isLogged,
  advertissementsController.deleteAdvertisement
);
router.get("/search/:advertName", advertissementsController.searchAdvert);

//! Define routes users

router.post("/signup", usersController.createUser);
router.post("/login", usersController.login);
router.get("/user/:userId", usersController.getOneUser);
router.get("/me", auth.isLogged, usersController.getMe);
router.put("/user", auth.isLogged, usersController.updateUser);
router.put("/user/password", auth.isLogged, usersController.updatePassword);
router.delete("/user", auth.isLogged, usersController.deleteUser);

//! Define routes company

router.get("/company/:companyId", compagnyController.getOneCompany);
router.post("/company", auth.isLogged, compagnyController.createCompany);
router.put(
  "/company/:companyId",
  auth.isLogged,
  compagnyController.updateCompany
);
router.delete(
  "/company/:companyId",
  auth.isLogged,
  compagnyController.deleteCompany
);
router.get("/search/:companyName", compagnyController.searchCompany);

//! Define routes applications

router.post("/application/:advertId", applicationController.applyToAdvert);

//! Define route superman

router.get(
  "/superman",
  auth.isLogged,
  auth.isSuperman,
  supermanController.isSuperman
);
router.get(
  "/superman/advertissements",
  auth.isLogged,
  auth.isSuperman,
  supermanController.getAdvertissements
);
router.get(
  "/superman/users",
  auth.isLogged,
  auth.isSuperman,
  supermanController.getUsers
);
router.get(
  "/superman/applications",
  auth.isLogged,
  auth.isSuperman,
  supermanController.getApplications
);
router.get(
  "/superman/aplications/:advertId",
  auth.isLogged,
  auth.isSuperman,
  supermanController.getApplicationsByAdvert
);
router.get(
  "/superman/company",
  auth.isLogged,
  auth.isSuperman,
  supermanController.getCompanies
);

router.post(
  "/superman/advertissements/:companyId",
  auth.isLogged,
  auth.isSuperman,
  supermanController.createAdvertissement
);
router.post(
  "/superman/user",
  auth.isLogged,
  auth.isSuperman,
  usersController.createUser
);
router.post(
  "/superman/company",
  auth.isLogged,
  auth.isSuperman,
  supermanController.createCompany
);

router.put(
  "/superman/advertissement/:advertId/update",
  auth.isLogged,
  auth.isSuperman,
  supermanController.updateAdvertissement
);
router.put(
  "/superman/user/:userId",
  auth.isLogged,
  auth.isSuperman,
  supermanController.updateUser
);

router.put(
  "/superman/company/:companyId/update",
  auth.isLogged,
  auth.isSuperman,
  supermanController.updateCompany
);

router.delete(
  "/superman/advertissement/:advertId",
  auth.isLogged,
  auth.isSuperman,
  supermanController.deleteAdvertissement
);
router.delete(
  "/superman/user/:userId",
  auth.isLogged,
  auth.isSuperman,
  supermanController.deleteUser
);
router.delete(
  "/superman/company/:companyId",
  auth.isLogged,
  auth.isSuperman,
  supermanController.deleteCompany
);

//! Export router
module.exports = router;
