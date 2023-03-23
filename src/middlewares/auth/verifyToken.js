const jwt = require("jsonwebtoken");
const { config } = require("../../config/config");

const isLearner = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, config.jwt_secret);
    req.user = decoded.data;
    if (decoded.data.role === "learner") {
      return next();
    }
    return res.status(403).json({ message: "Not learner!" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, config.jwt_secret);
    req.user = decoded.data;
    if (decoded.data.role === "admin") {
      return next();
    }
    return res.status(403).json({ message: "Not admin!" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};

const isRider = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, config.jwt_secret);
    req.user = decoded.data;
    if (decoded.data.role === "rider") {
      return next();
    }
    return res.status(403).json({ message: "Not rider!" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};

module.exports = {
  isLearner,
  isAdmin,
  isRider,
};
