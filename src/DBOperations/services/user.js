const mongoose = require("mongoose");
const userModel = require("../model/user");

const createUser = async (info) => {
  return await userModel.create(info);
};

const findUserInfoByEmail = async (email) => {
  return await userModel.findOne({ email });
};

const findUserTotalCount = async () => {
  return await userModel.countDocuments({});
};

const findUsers = async (limit, page) => {
  return await userModel
    .find({})
    .skip((page - 1) * limit)
    .limit(limit);
};

const modifyUsersStatus = async (info) => {
  const _ids = info?._ids?.map((id) => mongoose.Types.ObjectId(id));

  return await userModel.updateMany(
    { _id: _ids },
    { $set: { status: info.status } }
  );
};

const findUsersByEmail = async (email) => {
  return await userModel.find({ email: new RegExp(email, "i") });
};

const findUsersByName = async (name) => {
  return await userModel.find({ fullName: new RegExp(name, "i") });
};

const findUsersByPhone = async (phone) => {
  return await userModel.find({ phone: new RegExp(phone, "i") });
};

const findUsersByAgeRange = async (ageRange) => {
  return await userModel.find({
    age: { $gte: ageRange.from, $lte: ageRange.to },
  });
};

module.exports = {
  createUser,
  findUserInfoByEmail,
  modifyUsersStatus,
  findUsersByEmail,
  findUsersByName,
  findUsersByPhone,
  findUsersByAgeRange,
  findUserTotalCount,
  findUsers,
};
