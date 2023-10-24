require("dotenv").config();

const datamapper = require("../models/applications.datamapper");
const loginService = require("../services/login.service");
const advertDatamapper = require("../models/advertissements.datamapper");
const companyDatamapper = require("../models/company.datamapper");
const nodemailer = require("nodemailer");

const controller = {
  //!Apply to an advertissement
  applyToAdvert: async (req, res) => {
    //Recup the data from the body and the params
    const { firstName, lastName, email, exp, school, skills } = req.body;
    const { advertId } = req.params;
    const advertissementId = parseInt(advertId);

    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);

      if (userId) {
        //Check if the user already apply to the advertissement
        const application = await datamapper.checkIfUserAlreadyApply(
          advertissementId,
          userId
        );

        //If the user already apply to the advertissement
        if (application) {
          return res.status(400).json({
            error: "You already apply to this advertissement",
          });
        }

        //Create the application and the application information
        const newApplication = await datamapper.applyToAdvertUserLogged(
          advertissementId,
          userId
        );

        // recup the applicationId
        const applicationId = newApplication.applicationId;

        //Create the application information
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

        // Check if the jobInformation is already exist
        const jobInformation = await datamapper.getJobInformation(
          advertissementId,
          userId
        );

        //If the jobInformation is already exist, update it with applied to the advertissement
        if (jobInformation) {
          const updatedJobInformation = await datamapper.updateJobInformation(
            advertissementId,
            userId
          );

          //Return the response
          const responseData = {
            application: newApplication,
            applicationInformation: newApplicationInformation,
            jobInformation: updatedJobInformation,
          };

          return res.json(responseData);
        } else {
          //If the jobInformation is not exist, create it
          const newJobInformation = await datamapper.createJobInformation(
            advertissementId,
            userId
          );

          //Return the response
          const responseData = {
            application: newApplication,
            applicationInformation: newApplicationInformation,
            jobInformation: newJobInformation,
          };

          return res.json(responseData);
        }
      }

      //Create the application and the application information
      const newApplication = await datamapper.applyToAdvert(advertissementId);

      // recup the applicationId
      const applicationId = newApplication.applicationId;

      //Create the application information
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

      //Send a mail with the title of the advertissement and the name of the company
      const advertissement =
        await advertDatamapper.getOneAdvertisement(advertissementId);

      const company = await companyDatamapper.getCompany(advertissement.companyId);

      const advertTitle = advertissement.title;
      const companyName = company.name;
      const userEmail = process.env.EMAIL_USER;
      const userPassword = process.env.EMAIL_PASS;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: userEmail,
          pass: userPassword,
        },
      });


      const mailOptions = {
        from: userEmail,
        to: email,
        subject: "You apply to an advertissement",
        text: `Hello ${firstName},You apply to the advertissement ${advertTitle} from ${companyName}`,
      };

      transporter.sendMail(mailOptions, function (error, info) { });

      //Return the response
      const responseData = {
        applicationInformation: newApplicationInformation,
        application: newApplication,
      };
      return res.json(responseData);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },
};

module.exports = controller;
