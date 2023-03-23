const express = require("express");
const { findOrders, addOrder } = require("../DBOperations/controller/order");
const { isLearner } = require("../middlewares/auth/verifyToken");

const router = express.Router();

router.get("/get/:userId", isLearner, findOrders);
router.post("/create", isLearner, addOrder);

module.exports = router;
