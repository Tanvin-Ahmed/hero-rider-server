const mongoose = require("mongoose");
const { config } = require("../../config/config");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    age: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    area: {
      type: String,
    },
    role: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    profile: {
      type: String,
      require: true,
    },
    nid: {
      type: String,
      require: true,
    },
    drivingLicense: {
      type: String,
    },
    carName: {
      type: String,
    },
    carModel: {
      type: String,
    },
    namePalate: {
      type: String,
    },
    vehicleType: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model(config.users_collection, userSchema);
