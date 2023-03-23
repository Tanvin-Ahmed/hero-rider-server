const express = require("express");
const { isLearner } = require("../middlewares/auth/verifyToken");
const { getPaymentIntent } = require("../payment/stripePayment");

const route = express.Router();

route.post("/create-payment-intent", isLearner, async (req, res) => {
  try {
    const { price } = req.body;
    const clientSecret = await getPaymentIntent(price);
    return res.status(200).json({ clientSecret });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = route;
