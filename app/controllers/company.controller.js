const datamapper = require("../models/company.datamapper");
const loginService = require("../services/login.service");

const controller = {
  //! Get one compagny
  getOneCompany: async (req, res) => {
    const companyId = parseInt(req.params.companyId);

    try {
      const oneCompany = await datamapper.getCompany(companyId);
      res.json(oneCompany);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Create one company
  createCompany: async (req, res) => {
    const { name, logo } = req.body;

    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);
      // Update user profile to admin
      await datamapper.updateUserAdmin(userId);

      //Create the company
      const newCompany = await datamapper.createCompany(userId, name, logo);
      res.json(newCompany);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Update one company
  updateCompany: async (req, res) => {
    // Recup the companyId from the params
    const companyId = parseInt(req.params.companyId);
    // Recup the data from the body
    const { name, logo } = req.body;

    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);
      //To know if the user is an admin
      const isAdmin = await datamapper.isAdmin(userId);
      if (!isAdmin) {
        return res.status(403).send("You are not an admin");
      }

      //Check if the user is the admin of the company
      const company = await datamapper.getCompany(companyId);
      if (company.userId !== userId) {
        return res.status(403).send("You are not the admin of this company");
      }

      //Update the company
      const updatedCompany = await datamapper.updateCompany(
        companyId,
        name,
        logo
      );
      res.json(updatedCompany);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Delete a company
  deleteCompany: async (req, res) => {
    //Recup the companyId
    const companyId = parseInt(req.params.companyId);

    //Recup the userId from the token
    const userId = await loginService.getUserId(req);

    try {
      //To know if the user is an admin
      const isAdmin = await datamapper.isAdmin(userId);
      if (!isAdmin) {
        return res.status(403).send("You are not an admin");
      }

      //Check if the user is the admin of the company
      const company = await datamapper.getCompany(companyId);
      if (company.userId !== userId) {
        return res.status(403).send("You are not the admin of this company");
      }

      // Update user profile to no admin
      const updateUser = await datamapper.updateUser(userId);
      if (!updateUser) {
        return res.status(500).send("Error while updating user profile");
      }

      //Delete the company and his advertissements
      const deletedCompany = await datamapper.deleteCompany(companyId);

      //Send the response
      res.json(deletedCompany);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Get one company by his name
  searchCompany: async (req, res) => {
    const companyName = req.params.companyName;

    try {
      const company = await datamapper.searchCompany(companyName);
      res.json(company);
    } catch (error) {
      return null;
    }
  },
};

module.exports = controller;
