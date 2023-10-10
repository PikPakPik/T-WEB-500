const datamapper = require("../models/company.datamapper");

const controller = {
  //! Get one compagny
  getOneCompany: async (req, res) => {
    const companyId = parseInt(req.params.companyId);
    const oneCompany = await datamapper.getCompany(companyId);
    res.json(oneCompany);
  },
};

module.exports = controller;
