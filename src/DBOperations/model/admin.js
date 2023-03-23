const mongoose = require("mongoose");
const { config } = require("../../config/config");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model(config.admin_collection, adminSchema);
