const datamapper = require("../models/advertissements.datamapper");

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
    const userId = 

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
};

module.exports = controller;
