const datamapper = require("../models/users.datamapper");

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
      //Create the user if he doesn't exist
      const createdUser = await datamapper.createUser(
        firstName,
        lastName,
        email,
        userPassword,
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
};

module.exports = controller;
