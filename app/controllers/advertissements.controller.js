const datamapper = require("../models/advertissements.datamapper");
const loginService = require("../services/login.service");

const controller = {
  //! Show all advertissements
  getAdvertissements: async (req, res) => {
    const advertissements = await datamapper.getAdvertissements();
    res.json(advertissements);
  },

  //! Show one advertisement (with job Information if exist)
  getOneAdvertisement: async (req, res) => {
    const advertId = parseInt(req.params.advertId);
    const oneAdvertisement = await datamapper.getOneAdvertisement(advertId);

    // Recup the userId from the token
    const token = req.headers.authorization?.replace("Bearer ", "");

    // If we get the userId, we search the jobInformation and send it with the response
    if (token) {
      const user = loginService.getUser(token);
      const userId = user.id;
      const jobInformation = await datamapper.getJobInformation(
        advertId,
        userId
      );

      // Send the response
      const responseData = {
        oneAdvertisement,
        jobInformation,
      };
      return res.json(responseData);
    }

    // Send the response
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

  //! To know if the job information exist or not
  isJobInformationExist: async (req, res) => {
    //Recup the userId from the token
    const token = req.headers.authorization?.replace("Bearer ", "");
    const user = loginService.getUser(token);
    const userId = user.id;
    const { isSaved, isApplied } = req.body;

    //Recup the advertId from the params
    const advertId = parseInt(req.params.advertId);

    //Check if the job information exist
    const jobInformation = await datamapper.getJobInformation(advertId, userId);

    if (jobInformation.length !== 0) {
      console.log("jobInformation exist");
      //*Update the jobInformation
      const updatedJobInformation = await datamapper.updateJobInformation(
        advertId,
        userId,
        isSaved,
        isApplied
      );

      res.json(updatedJobInformation);
    } else {
        console.log("jobInformation not exist");
      //*Create the jobInformation
      const newJobInformation = await datamapper.createJobInformation(
        advertId,
        userId,
        isSaved,
        isApplied
      );
      res.json(newJobInformation);
    }
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

  //! Delete an advertisement
  deleteAdvertisement: async (req, res) => {
    //Recup the advertId
    const advertId = parseInt(req.params.advertId);

    //Recup the userId from the token
    const token = req.headers.authorization?.replace("Bearer ", "");
    const user = loginService.getUser(token);
    const userId = user.id;

    //To know if the user is an admin
    const isAdmin = await datamapper.isAdmin(userId);
    if (!isAdmin) {
      return res.status(403).send("You are not an admin");
    }

    //Check if the user is the admin of the company of the advertisement
    const company = await datamapper.getCompanyByAdvertId(advertId);
    if (company.userId !== userId) {
      return res.status(403).send("You are not the admin of this company");
    }

    //Delete the advertisement
    try {
      const deletedAdvertisement = await datamapper.deleteAdvertisement(
        advertId
      );

      res.json(deletedAdvertisement);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }

    const deletedAdvertisement = await datamapper.deleteAdvertisement(advertId);
    res.json(deletedAdvertisement);
  },
};

module.exports = controller;
