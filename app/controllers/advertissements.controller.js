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
};

module.exports = controller;
