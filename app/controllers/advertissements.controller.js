const datamapper = require("../models/advertissements.datamapper");
const loginService = require("../services/login.service");

const controller = {
  //! Show all advertissements
  getAdvertissements: async (req, res) => {
    const advertissements = await datamapper.getAdvertissements();
    res.json(advertissements);
  },

  //! Show one advertisement
  getOneAdvertisement: async (req, res) => {
    const advertId = parseInt(req.params.advertId);
    const oneAdvertisement = await datamapper.getOneAdvertisement(advertId);
    res.json(oneAdvertisement);
  },

  //! Show all advertisements from one company
  getCompanyAdvertisements: async (req, res) => {
    const companyId = parseInt(req.params.companyId);
    const companyAdvertisements = await datamapper.getCompanyAdvertisements(
      companyId
    );
    res.json(companyAdvertisements);
  },

  //! Create an advertisement
  createAdvertisement: async (req, res) => {
    const { title, description, place, workingTime, expRequired } = req.body;
    const wages = parseInt(req.body.wages);

    //Recup the userId from the token
    const token = req.headers.authorization?.replace("Bearer ", "");
    const user = loginService.getUser(token);
    const userId = user.id;

    //Search the company with the userId
    const company = await datamapper.getOneCompany(userId);
    const companyId = parseInt(company[0].companyId);

    //Create the advertisement
    const newAdvertisement = await datamapper.createAdvertisement(
      companyId,
      title,
      description,
      wages,
      place,
      workingTime,
      expRequired
    );

    res.json(newAdvertisement);
  },

  //! Create a job information
  createJobInformation: async (req, res) => {
    //Recup the userId from the token
    const token = req.headers.authorization?.replace("Bearer ", "");
    const user = loginService.getUser(token);
    const userId = user.id;

    //Recup the advertId from the params & the jobInformation from the body
    const advertId = parseInt(req.params.advertId);
    const { isSaved, isApplied } = req.body;

    //Create the jobInformation
    const newJobInformation = await datamapper.createJobInformation(
      advertId,
      userId,
      isSaved,
      isApplied
    );
    res.json(newJobInformation);
  },

  //! Show all saved advertisements
  getSavedAdvert: async (req, res) => {
    //Recup the userId from the token
    const token = req.headers.authorization?.replace("Bearer ", "");
    const user = loginService.getUser(token);
    const userId = user.id;

    //Get all saved advertisements
    const savedAdvert = await datamapper.getSavedAdvert(userId);
    res.json(savedAdvert);
  },

  //! Show all applied advertisements
  getAppliedAdvert: async (req, res) => {
    //Recup the userId from the token
    const token = req.headers.authorization?.replace("Bearer ", "");
    const user = loginService.getUser(token);
    const userId = user.id;

    //Get all applied advertisements
    const appliedAdvert = await datamapper.getAppliedAdvert(userId);
    res.json(appliedAdvert);
  },

  //TODO: finish this delete route
  //! Delete an advertisement
  deleteAdvertisement: async (req, res) => {
    const advertId = parseInt(req.params.advertId);
    const deletedAdvertisement = await datamapper.deleteAdvertisement(advertId);
    res.json(deletedAdvertisement);
  },
};

module.exports = controller;
