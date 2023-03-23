const mongoose = require("mongoose");
const orderModel = require("../model/order");

const createOrder = async (info) => {
  const information = {
    ...info,
    userId: new mongoose.Types.ObjectId(info.userId),
  };

  return await orderModel.create(information);
};

const getOrder = async (userId) => {
  const _id = new mongoose.Types.ObjectId(userId);
  return await orderModel.find({ userId: _id });
};

module.exports = {
  createOrder,
  getOrder,
};
