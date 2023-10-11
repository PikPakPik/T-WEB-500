const datamapper = require("../models/users.datamapper");
const loginService = require("../services/login.service");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
      // console.log(response);
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
      console.log(error);
      res.status(500).send("Error while getting the user");
    }
  },
};

module.exports = controller;
