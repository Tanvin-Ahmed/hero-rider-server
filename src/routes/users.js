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
  getTotalUserCountByEmail,
  getTotalUserCountByPhone,
  getTotalUserCountByFullName,
  getTotalUserCountByAgeRange,
} = require("../DBOperations/controller/user");
const { isAdmin } = require("../middlewares/auth/verifyToken");
const router = express.Router();

/* GET users listing. */
router.post("/register", register);
router.post("/login", login);

// admin routes
router.get("/total-count", isAdmin, getTotalUserCount);
router.get("/total-count-by-email", isAdmin, getTotalUserCountByEmail);
router.get("/total-count-by-phone", isAdmin, getTotalUserCountByPhone);
router.get("/total-count-by-fullName", isAdmin, getTotalUserCountByFullName);
router.post("/total-count-by-age-range", isAdmin, getTotalUserCountByAgeRange);
router.put("/update-status", isAdmin, updateUsersStatus);
router.get("/get", isAdmin, getUsers);
router.get("/search/fullName", isAdmin, getUsersByFullName);
router.get("/search/email", isAdmin, getUsersByEmail);
router.get("/search/phone", isAdmin, getUsersByPhone);
router.post("/search/age-range", isAdmin, getUsersByAgeRange);

module.exports = router;
