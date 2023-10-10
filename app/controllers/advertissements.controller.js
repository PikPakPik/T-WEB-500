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
};

module.exports = controller;
