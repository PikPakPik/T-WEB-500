const { parse } = require("dotenv");
const datamapper = require("../models/applications.datamapper");
const loginService = require("../services/login.service");

const controller = {
  //!Apply to an advertissement
  applyToAdvert: async (req, res) => {
    //Recup the data from the body and the params
    const { firstName, lastName, email, exp, school, skills } = req.body;
    const { advertId } = req.params;
    const advertissementId = parseInt(advertId);

    //Recup the userId from the token if exist
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      const user = loginService.getUser(token);
      const userId = user.id;

      const newApplication = await datamapper.applyToAdvertUserLogged(
        advertissementId,
        userId
      );

      const applicationId = newApplication.applicationId;

      const newApplicationInformation =
        await datamapper.createApplicationInformation(
          firstName,
          lastName,
          email,
          exp,
          school,
          skills,
          applicationId
        );

      const responseData = {
        application: newApplication,
        applicationInformation: newApplicationInformation,
      };
      return res.json(responseData);
    }

    const newApplication = await datamapper.applyToAdvert(advertissementId);

    const applicationId = newApplication.applicationId;

    const newApplicationInformation =
      await datamapper.createApplicationInformation(
        firstName,
        lastName,
        email,
        exp,
        school,
        skills,
        applicationId
      );

    const responseData = {
      applicationInformation: newApplicationInformation,
      application: newApplication,
    };
    return res.json(responseData);
  },

  //!Get all applications of a user
  getUserApplications: async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      const user = loginService.getUser(token);
      const userId = user.id;

      const applications = await datamapper.getUserApplications(userId);
      return res.json(applications);
    }
    return res.status(401).json({ error: "Unauthorized" });
  },
};

module.exports = controller;
