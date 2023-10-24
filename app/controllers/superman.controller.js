const datamapper = require("../models/superman.datamapper");
const loginService = require("../services/login.service");
const advertDatamapper = require("../models/advertissements.datamapper");
const companyDatamapper = require("../models/company.datamapper");
const userDatamapper = require("../models/users.datamapper");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const controller = {
  isSuperman: async (req, res) => {
    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);

      // Get the user from the database
      const superman = await datamapper.getOneSuperman(userId);
      //Send the response
      res.json(superman);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //! Get all advertissements
  getAdvertissements: async (req, res) => {
    try {
      // Get the page number from the query parameters
      const pageNumber = req.query.page || 1;
      // Define the number of items per page
      const itemsPerPage = 10;
      // Calculate the number of items to skip
      const skip = (pageNumber - 1) * itemsPerPage;

      // Get all advertissements skip and take
      const advertissements = await datamapper.getAdvertissements(
        itemsPerPage,
        skip
      );
      res.json(advertissements);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //! Get all users
  getUsers: async (req, res) => {
    try {
      // Get the page number from the query parameters
      const pageNumber = req.query.page || 1;
      // Define the number of items per page
      const itemsPerPage = 10;
      // Calculate the number of items to skip
      const skip = (pageNumber - 1) * itemsPerPage;

      // Get all users skip and take
      const users = await datamapper.getUsers(itemsPerPage, skip);
      res.json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //! Get all applications
  getApplications: async (req, res) => {
    try {
      // Get the page number from the query parameters
      const pageNumber = req.query.page || 1;
      // Define the number of items per page
      const itemsPerPage = 10;
      // Calculate the number of items to skip
      const skip = (pageNumber - 1) * itemsPerPage;

      // Get all applications skip and take
      const applications = await datamapper.getApplications(itemsPerPage, skip);
      res.json(applications);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //! Get all applications by advert
  getApplicationsByAdvert: async (req, res) => {
    try {
      // Get the page number from the query parameters
      const pageNumber = req.query.page || 1;

      //Get the advertId from the params
      const advertId = parseInt(req.params.advertId);
      // Define the number of items per page
      const itemsPerPage = 10;
      // Calculate the number of items to skip
      const skip = (pageNumber - 1) * itemsPerPage;

      // Get all applications by advert skip and take
      const applications = await datamapper.getApplicationsByAdvert(
        advertId,
        itemsPerPage,
        skip
      );
      res.json(applications);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //! Get all company
  getCompanies: async (req, res) => {
    try {
      // Get the page number from the query parameters
      const pageNumber = req.query.page || 1;
      // Define the number of items per page
      const itemsPerPage = 10;
      // Calculate the number of items to skip
      const skip = (pageNumber - 1) * itemsPerPage;

      // Get all company skip and take
      const companies = await datamapper.getCompanies(itemsPerPage, skip);
      res.json(companies);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //! Create an advertissement
  createAdvertissement: async (req, res) => {
    try {
      // Get the data from the params & body
      const companyId = parseInt(req.params.companyId);
      const { title, description, place, workingTime, expRequired } = req.body;
      const wages = parseInt(req.body.wages);

      const newAdvertisement = await advertDatamapper.createAdvertisement(
        companyId,
        title,
        description,
        wages,
        place,
        workingTime,
        expRequired
      );

      //Send the response
      res.json(newAdvertisement);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //! Create a company
  createCompany: async (req, res) => {
    try {
      //Get the data from the request body
      const { name, logo, userId } = req.body;

      const newUser = await companyDatamapper.createCompany(name, logo, userId);
      const upadteIsAdmin = await userDatamapper.updateUserAdmin(userId);
      //Send the response
      res.json(newUser, upadteIsAdmin);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //! Update an advertisement
  updateAdvertissement: async (req, res) => {
    // Recup the advertId
    const advertId = parseInt(req.params.advertId);

    //Recup the data from the body
    const { title, description, place, workingTime, expRequired } = req.body;
    const wages = parseInt(req.body.wages);

    try {
      //Update the advertisement
      const updatedAdvertisement = await advertDatamapper.updateAdvertisement(
        advertId,
        title,
        description,
        wages,
        place,
        workingTime,
        expRequired
      );
      //Send the response
      res.json(updatedAdvertisement);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Update a user
  updateUser: async (req, res) => {
    //Recup the userId
    const userId = parseInt(req.params.userId);
    let hashedPassword = null;

    // Get the new data from the request body
    const { firstName, lastName, email, exp, school, skills, newPassword, isAdmin, isSuperman } =
      req.body;

    const user = await userDatamapper.getOneUser(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (newPassword === user.userPassword) {
      hashedPassword = newPassword;
    } else {
      hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    }

    try {
      //Update the user
      const updatedUser = await datamapper.updateUser(
        userId,
        firstName,
        lastName,
        email,
        exp,
        school,
        skills,
        hashedPassword,
        isSuperman,
        isAdmin
      );
      //Send the response
      res.json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },

  //! Update a company
  updateCompany: async (req, res) => {
    const companyId = parseInt(req.params.companyId);

    // Get the new data from the request body
    const { name, logo } = req.body;

    try {
      //Update the company
      const updatedCompany = await companyDatamapper.updateCompany(
        companyId,
        name,
        logo
      );
      //Send the response
      res.json(updatedCompany);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteAdvertissement: async (req, res) => {
    //Recup the advertId
    const advertId = parseInt(req.params.advertId);

    try {
      //Delete the advertisement
      const deletedAdvertisement =
        await advertDatamapper.deleteAdvertisement(advertId);
      //Send the response
      res.json(deletedAdvertisement);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Delete a user
  deleteUser: async (req, res) => {
    //Recup the userId
    const userId = parseInt(req.params.userId);

    try {
      //Delete the user
      const deleteUser = await userDatamapper.deletedUser(userId);
      //Send the response
      res.json(deleteUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Delete a company
  deleteCompany: async (req, res) => {
    // Recup the companyId
    const companyId = parseInt(req.params.companyId);

    try {
      //Delete the company
      const deletedCompany = await companyDatamapper.deleteCompany(companyId);
      //Send the response
      res.json(deletedCompany);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = controller;
