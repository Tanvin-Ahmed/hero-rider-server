const mongoose = require("mongoose");
const { config } = require("../../config/config");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: config.users_collection,
    },
    paymentId: {
      type: String,
      require: true,
    },
    packageId: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model(config.order_collection, orderSchema);
