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

const findUserTotalCountByEmail = async (email) => {
  return await userModel.countDocuments({ email: new RegExp(email, "i") });
};

const findUserTotalCountByPhone = async (phone) => {
  return await userModel.countDocuments({ phone: new RegExp(phone, "i") });
};

const findUserTotalCountByFullName = async (fullName) => {
  return await userModel.countDocuments({
    fullName: new RegExp(fullName, "i"),
  });
};

const findUserTotalCountByAgeRange = async (ageRange) => {
  return await userModel.countDocuments({
    age: { $gte: ageRange.from, $lte: ageRange.to },
  });
};

const findUsers = async (limit, page) => {
  return await userModel
    .find({})
    .skip((page - 1) * limit)
    .limit(limit);
};

const modifyUsersStatus = async (info) => {
  const _ids = info?._ids?.map((id) => new mongoose.Types.ObjectId(id));

  return await userModel.updateMany(
    { _id: _ids },
    { $set: { status: info.status } }
  );
};

const findUsersByEmail = async (email, limit, page) => {
  return await userModel
    .find({ email: new RegExp(email, "i") })
    .skip((page - 1) * limit)
    .limit(limit);
};

const findUsersByName = async (name, limit, page) => {
  return await userModel
    .find({ fullName: new RegExp(name, "i") })
    .skip((page - 1) * limit)
    .limit(limit);
};

const findUsersByPhone = async (phone, limit, page) => {
  return await userModel
    .find({ phone: new RegExp(phone, "i") })
    .skip((page - 1) * limit)
    .limit(limit);
};

const findUsersByAgeRange = async (ageRange, limit, page) => {
  return await userModel
    .find({ age: { $gte: ageRange.from, $lte: ageRange.to } })
    .skip((page - 1) * limit)
    .limit(limit);
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
  findUserTotalCountByEmail,
  findUserTotalCountByPhone,
  findUserTotalCountByFullName,
  findUserTotalCountByAgeRange,
};
