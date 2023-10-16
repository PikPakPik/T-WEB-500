const datamapper = require("../models/company.datamapper");
const loginService = require("../services/login.service");

const controller = {
  //! Get one compagny
  getOneCompany: async (req, res) => {
    const companyId = parseInt(req.params.companyId);
    const oneCompany = await datamapper.getCompany(companyId);
    res.json(oneCompany);
  },

  //! Create one company
  createCompany: async (req, res) => {
    const { name, logo } = req.body;
    //Recup the userId from the token
    const token = req.headers.authorization?.replace("Bearer ", "");
    const user = loginService.getUser(token);
    const userId = user.id;

    //To know if the user is an admin
    const isAdmin = await datamapper.isAdmin(userId);
    if (!isAdmin) {
      return res.status(403).send("You are not an admin");
    }

    //Create the company
    try {
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

    //Recup the userId from the token
    const token = req.headers.authorization?.replace("Bearer ", "");
    const user = loginService.getUser(token);
    const userId = user.id;

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
    try {
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
};

module.exports = controller;
