const bcrypt = require("bcrypt");

module.exports.hashGenerator = async (password, salt) => {
  try {
    const saltRound = await bcrypt.genSalt(salt);
    return await bcrypt.hash(password, saltRound);
  } catch (error) {
    console.log("Something went wrong in hash password generator!");
    return null;
  }
};
