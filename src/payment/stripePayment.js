const { config } = require("../config/config");
const stripe = require("stripe")(config.stripe_secret_key);

module.exports.getPaymentIntent = async (price) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: "usd",
    payment_method_types: ["card"],
  });
  return paymentIntent.client_secret;
};
