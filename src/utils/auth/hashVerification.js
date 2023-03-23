const bcrypt = require("bcrypt");

module.exports.hashVerification = async (hash, password) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    return null;
  }
};
