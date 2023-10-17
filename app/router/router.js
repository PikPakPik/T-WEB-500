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
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all advertissements
 *     description: Retrieve a list of all adverts
 *     responses:
 *       200:
 *         description: A list of adverts.
 */
router.get("/", advertissementsController.getAdvertissements);

/**
 * @swagger
 * /advert/{advertId}:
 *   get:
 *     summary: Get one advertissement
 *     description: Retrieve one advertissement
 *     responses:
 *       200:
 *         description: One advertissement.
 */
router.get("/advert/:advertId", advertissementsController.getOneAdvertisement);

/**
 * @swagger
 * /advertCompany/{companyId}:
 *   get:
 *     summary: Get all advertissements from one company
 *     description: Retrieve a list of all adverts from one company
 *     responses:
 *       200:
 *         description: Retrieve a list of all adverts from one company.
 */
router.get(
  "/advertCompany/:companyId",
  advertissementsController.getCompanyAdvertisements
);

/**
 * @swagger
 * /advert:
 *   post:
 *     summary: Create an advertissement
 *     description: As a company, I want to create an advert
 *     responses:
 *       200:
 *         description: As a company, I want to create an advert.
 */
router.post(
  "/advert",
  auth.isLogged,
  advertissementsController.createAdvertisement
);

/**
 * @swagger
 * /advert/{advertId}/save:
 *   post:
 *     summary: Update or Create an Job Information
 *     description: Check if the Job Information already exist, if exist, update it else create it
 *     responses:
 *       200:
 *         description: Check if the Job Information already exist, if exist, update it else create it.
 */
router.post(
  "/advert/:advertId/save",
  auth.isLogged,
  advertissementsController.isJobInformationExist
);

/**
 * @swagger
 * /jobInformation/{advertId}:
 *   put:
 *     summary: Update or Create an Job Information
 *     description: Check if the Job Information already exist, if exist, update it else create it
 *     responses:
 *       200:
 *         description: Check if the Job Information already exist, if exist, update it else create it.
 */
router.put(
  "/jobInformation/:advertId",
  auth.isLogged,
  advertissementsController.isJobInformationExist
);

/**
 * @swagger
 * /savedAdvert:
 *   get:
 *     summary: Get all saved advertisements from one user
 *     description: Retrieve a list of all saved adverts from one user
 *     responses:
 *       200:
 *         description: Retrieve a list of all saved adverts from one user.
 */
router.get(
  "/savedAdvert",
  auth.isLogged,
  advertissementsController.getSavedAdvert
);

/**
 * @swagger
 * /appliedAdvert:
 *   get:
 *     summary: Get all applied advertisements from one user
 *     description: Retrieve a list of all applied adverts from one user
 *     responses:
 *       200:
 *         description: Retrieve a list of all applied adverts from one user.
 */
router.get(
  "/appliedAdvert",
  auth.isLogged,
  advertissementsController.getAppliedAdvert
);

/**
 * @swagger
 * /advert/{advertId}:
 *   put:
 *     summary: Update an advertissement
 *     description: As a company, I want to update an advert
 *     responses:
 *       200:
 *         description: As a company, I want to update an advert.
 */
router.put(
  "/advert/:advertId",
  auth.isLogged,
  advertissementsController.updateAdvertisement
);

/**
 * @swagger
 * /savedAdvert:
 *   delete:
 *     summary: Delete one advertissement
 *     description: As a company, I want to delete one advertissement
 *     responses:
 *       200:
 *         description: As a company, I want to delete one advertissement.
 */
router.delete(
  "/advert/:advertId",
  auth.isLogged,
  advertissementsController.deleteAdvertisement
);

//! Define routes users

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create one user
 *     description: As a user, I want to create an account
 *     responses:
 *       200:
 *         description: As a user, I want to create an account.
 */
router.post("/signup", usersController.createUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     description: As a user, I want to access to my account
 *     responses:
 *       200:
 *         description: As a user, I want to access to my account.
 */
router.post("/login", usersController.login);

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get one user
 *     description: Get the user's data
 *     responses:
 *       200:
 *         description: Get the user's data.
 */
router.get("/user/:userId", usersController.getOneUser);

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get my user's data
 *     description: As a logged user, I want to get my data
 *     responses:
 *       200:
 *         description: As a logged user, I want to get my data
 */
router.get("/me", auth.isLogged, usersController.getMe);

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update user's data
 *     description: As a logged user, I want to update my data
 *     responses:
 *       200:
 *         description: As a logged user, I want to update my data
 */
router.put("/user", auth.isLogged, usersController.updateUser);

//! Define routes company

/**
 * @swagger
 * /company/{companyId}:
 *   get:
 *     summary: Get one company
 *     description: Retrieve one company
 *     responses:
 *       200:
 *         description: Retrieve one company.
 */
router.get("/company/:companyId", compagnyController.getOneCompany);

/**
 * @swagger
 * /company:
 *   post:
 *     summary: Create a company
 *     description: As a logged user, I want to create a company
 *     responses:
 *       200:
 *         description: As a logged user, I want to create a company.
 */
router.post("/company", auth.isLogged, compagnyController.createCompany);

/**
 * @swagger
 * /company/{companyId}:
 *   put:
 *     summary: Update company's data
 *     description: As a logged admin user of the current company, I want to udpate the company's data
 *     responses:
 *       200:
 *         description: As a logged admin user of the current company, I want to udpate the company's data.
 */
router.put(
  "/company/:companyId",
  auth.isLogged,
  compagnyController.updateCompany
);

/**
 * @swagger
 * /company/{companyId}:
 *   delete:
 *     summary: Delete company
 *     description: As a logged admin user of the current company, I want to delete my company
 *     responses:
 *       200:
 *         description: As a logged admin user of the current company, I want to delete my company.
 */
router.delete(
  "/company/:companyId",
  auth.isLogged,
  compagnyController.deleteCompany
);

//! Define routes applications
/**
 * @swagger
 * /application/{advertId}:
 *   post:
 *     summary: Apply to an advert
 *     description: As a user (logged or not), I want to apply to an advert
 *     responses:
 *       200:
 *         description: As a user (logged or not), I want to apply to an advert
 */
router.post("/application/:advertId", applicationController.applyToAdvert);

//! Define route superman

router.get("/superman", supermanController.isSuperman);

//! Export router
module.exports = router;
