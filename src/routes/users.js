const express = require("express");
const {
  register,
  login,
  updateUsersStatus,
  getUsersByFullName,
  getUsersByEmail,
  getUsersByPhone,
  getUsersByAgeRange,
  getTotalUserCount,
  getUsers,
} = require("../DBOperations/controller/user");
const router = express.Router();

/* GET users listing. */
router.post("/register", register);
router.post("/login", login);
router.put("/update-status", updateUsersStatus);

// admin routes
router.get("/total-count", getTotalUserCount);
router.get("/get", getUsers);
router.get("/search/fullName", getUsersByFullName);
router.get("/search/email", getUsersByEmail);
router.get("/search/phone", getUsersByPhone);
router.post("/search/age-range", getUsersByAgeRange);

module.exports = router;
