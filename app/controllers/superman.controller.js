const datamapper = require("../models/superman.datamapper");
const loginService = require("../services/login.service");

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
      const pageNumber = req.query.pageNumber || 1;
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
      const pageNumber = req.query.pageNumber || 1;
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
      const pageNumber = req.query.pageNumber || 1;
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

  //! Get all company
  getCompanies: async (req, res) => {
    try {
      // Get the page number from the query parameters
      const pageNumber = req.query.pageNumber || 1;
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
};

module.exports = controller;
