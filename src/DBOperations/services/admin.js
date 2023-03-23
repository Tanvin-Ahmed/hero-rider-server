const adminModel = require("../model/admin");

const findAdmin = async (email) => {
  return await adminModel.findOne({ email });
};

module.exports = {
  findAdmin,
};
