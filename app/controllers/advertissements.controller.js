const datamapper = require("../models/advertissements.datamapper");
const loginService = require("../services/login.service");

const controller = {
  //! Show all advertissements
  getAdvertissements: async (req, res) => {
    try {
      const advertissements = await datamapper.getAdvertissements();
      res.json(advertissements);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Show one advertisement (with job Information if exist)
  getOneAdvertisement: async (req, res) => {
    const advertId = parseInt(req.params.advertId);
    try {
      //Recup the token from the headers if exist
      const token = req.headers.authorization?.replace("Bearer ", "");

      //Get one advertissement
      const oneAdvertisement = await datamapper.getOneAdvertisement(advertId);

      // If we get the userId, we search the jobInformation and send it with the response
      if (token) {
        //Recup the userId from the token
        const user = await loginService.getUser(token);
        const userId = user.id;

        //Get the jobInformation
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

      // Send the response without jobInformation
      res.json({ oneAdvertisement });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Show all advertisements from one company
  getCompanyAdvertisements: async (req, res) => {
    const companyId = parseInt(req.params.companyId);

    try {
      // Get all advertisements from one company
      const companyAdvertisements =
        await datamapper.getCompanyAdvertisements(companyId);

      //Send the response
      res.json(companyAdvertisements);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Create an advertisement
  createAdvertisement: async (req, res) => {
    const { title, description, place, workingTime, expRequired } = req.body;
    const wages = parseInt(req.body.wages);

    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);

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

      //Send the response
      res.json(newAdvertisement);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! To know if the job information exist or not
  isJobInformationExist: async (req, res) => {
    const { isSaved, isApplied } = req.body;

    //Recup the advertId from the params
    const advertId = parseInt(req.params.advertId);

    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);

      //Check if the job information exist
      const jobInformation = await datamapper.getJobInformation(
        advertId,
        userId
      );

      if (jobInformation.length !== 0) {
        //* If job Information exist, update the jobInformation
        const updatedJobInformation = await datamapper.updateJobInformation(
          advertId,
          userId,
          isSaved,
          isApplied
        );

        res.json(updatedJobInformation);
      } else {
        //*Else, create the jobInformation
        const newJobInformation = await datamapper.createJobInformation(
          advertId,
          userId,
          isSaved,
          isApplied
        );
        res.json(newJobInformation);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Show all saved advertisements
  getSavedAdvert: async (req, res) => {
    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);
      //Get all saved advertisements
      const savedAdvert = await datamapper.getSavedAdvert(userId);
      res.json(savedAdvert);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Show all applied advertisements
  getAppliedAdvert: async (req, res) => {
    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);
      //Get all applied advertisements
      const appliedAdvert = await datamapper.getAppliedAdvert(userId);
      res.json(appliedAdvert);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Update an advertisement
  updateAdvertisement: async (req, res) => {
    // Recup the advertId
    const advertId = parseInt(req.params.advertId);

    //Recup the data from the body
    const { title, description, place, workingTime, expRequired } = req.body;
    const wages = parseInt(req.body.wages);

    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);

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

      //Update the advertisement
      const updatedAdvertisement = await datamapper.updateAdvertisement(
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

  //! Delete an advertisement
  deleteAdvertisement: async (req, res) => {
    //Recup the advertId
    const advertId = parseInt(req.params.advertId);

    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);

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
      const deletedAdvertisement =
        await datamapper.deleteAdvertisement(advertId);
      res.json(deletedAdvertisement);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //! Search an advertisement by title
  searchAdvert: async (req, res) => {
    //Recup the advertName from the params
    const advertName = req.params.advertName;

    try {
      //Search the advertisement
      const searchAdvert = await datamapper.searchAdvert(advertName);
      res.json(searchAdvert);
    } catch (error) {
      return null;
    }
  },
};

module.exports = controller;
