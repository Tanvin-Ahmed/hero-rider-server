const jwt = require("jsonwebtoken");
const { config } = require("../../config/config");

module.exports.tokenGenerator = async (data) => {
  try {
    const token = await jwt.sign({ data }, config.jwt_secret, {
      expiresIn: "5d",
    });

    return token;
  } catch (error) {
    console.log("Error occurred in token generator!");
    return null;
  }
};
