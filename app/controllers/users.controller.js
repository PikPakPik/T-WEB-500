const datamapper = require("../models/users.datamapper");
const avertissementdatamapper = require("../models/advertissements.datamapper");
const loginService = require("../services/login.service");
const bcrypt = require("bcrypt");
const { getUserCompany } = require("../models/users.datamapper");
const saltRounds = 10;
const companyDatamapper = require("../models/company.datamapper");
const advertDatamapper = require("../models/advertissements.datamapper");
const res = require("express/lib/response");

const controller = {
  //! Create a new user
  createUser: async (req, res) => {
    //Get the data from the request body
    const {
      firstName,
      lastName,
      email,
      userPassword,
      isAdmin,
      exp,
      school,
      skills,
    } = req.body;

    try {
      //Hash the password
      const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

      //Create the user if he doesn't exist
      const createdUser = await datamapper.createUser(
        firstName,
        lastName,
        email,
        hashedPassword,
        isAdmin,
        exp,
        school,
        skills
      );
      res.json(createdUser);
    } catch (error) {
      console.log(error);

      if (error.code === "P2002") {
        return res.status(409).send("This email is already used");
      }

      res.status(500).send("Error while creating the user");
    }
  },

  //! login with JWT
  login: async (req, res) => {
    //Get the data from the request body
    const { email, userPassword } = req.body;

    try {
      const user = await datamapper.login(email);

      let isPasswordValid = false;
      if (user[0]) {
        isPasswordValid = await bcrypt.compare(
          userPassword,
          user[0].userPassword
        );
      }

      //If the user give wrong email or password
      if (!user[0] || !isPasswordValid) {
        return res.status(401).send("Wrong email or password");
      }

      //if the user give the right email and password then we create a JWT
      const token = await loginService.authentify(user[0].userId);

      if (!token) {
        throw new Error("Error while creating the token");
      }

      //We send the token
      const response = {
        logged: true,
        pseudo: user[0].firstName,
        token: token,
      };
      return res.json(response);

      //If there is an error
    } catch (error) {
      console.log(error);
      res.status(500).send("Error while logging in");
    }
  },

  //! Get one user
  getOneUser: async (req, res) => {
    //Get the userId from the request params
    const userId = parseInt(req.params.userId);

    try {
      //Get the user from the database
      const user = await datamapper.getOneUser(userId);

      //If the user doesn't exist
      if (!user) {
        return res.status(404).send("User not found");
      }

      //If the user exist
      return res.json(user);

      //If there is an error
    } catch (error) {
      res.status(500).send("Error while getting the user");
    }
  },

  //! Get the current user with the token
  getMe: async (req, res) => {
    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);

      //Get the user from the database
      const user = await datamapper.getOneUser(userId);

      // If isAdmin is true, we send the user and his company
      if (user.isAdmin) {
        const company = await getUserCompany(user.userId);
        if (!company) return res.json(user);
        user.company = company;

        const advertissements =
          await avertissementdatamapper.getCompanyAdvertisements(
            company.companyId
          );
        user.company.advertissements = advertissements;
      }

      //If the user exist
      return res.json(user);

      //If there is an error
    } catch (error) {
      res.status(500).send("Error while getting the user");
    }
  },

  //! Update the current user
  updateUser: async (req, res) => {
    //Get the data from the request body
    const { firstName, lastName, email, exp, school, skills } = req.body;

    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);

      //Update the user
      const updatedUser = await datamapper.updateUser(
        userId,
        firstName,
        lastName,
        email,
        exp,
        school,
        skills
      );

      //If the user doesn't exist
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }

      //If the user exist
      return res.json(updatedUser);
    } catch (error) {
      res.status(500).send("Error while updating the user");
    }
  },

  //! Update the password of the current user
  updatePassword: async (req, res) => {
    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);

      // Get the new password from the request body
      const { newPassword } = req.body;

      //Hash the password
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      //Update the user
      const updatedPassword = await datamapper.updatePassword(
        userId,
        hashedPassword
      );

      //If the user doesn't exist
      if (!updatedPassword) {
        return res.status(404).send("User not found");
      }

      //If the user exist
      return res.json(updatedPassword);
    } catch (error) {
      res.status(500).send("Error while updating the password");
    }
  },

  //! Delete the current user
  deleteUser: async (req, res) => {
    try {
      //Recup the userId from the token
      const userId = await loginService.getUserId(req);

      const deletedUser = await datamapper.deleteUser(userId);

      let responseData = {
        deletedUser,
      };

      //If the user doesn't exist
      if (!deletedUser) {
        return res.status(404).send("User not found");
      }

      //If the user is an admin, we delete his company
      const company = await getUserCompany(userId);

      if (company) {
        await companyDatamapper.deleteCompany(company.companyId);
        responseData.company = company;
      }

      //If the user have already applied to an advert, we delete his application
      const applications = await datamapper.getApplicationsByUserId(userId);

      if (applications) {
        await advertDatamapper.deleteAdvertisement;
        responseData.applications = applications;
      }

      return res.json(responseData);
    } catch (error) {
      res.status(500).send("Error while deleting the user");
    }
  },
};

module.exports = controller;
