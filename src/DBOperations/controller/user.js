const { hashGenerator } = require("../../utils/auth/hashGenerator");
const { hashVerification } = require("../../utils/auth/hashVerification");
const { tokenGenerator } = require("../../utils/auth/tokenGenerator");
const { findAdmin } = require("../services/admin");
const {
  createUser,
  findUserInfoByEmail,
  modifyUsersStatus,
  findUsersByName,
  findUsersByEmail,
  findUsersByPhone,
  findUsersByAgeRange,
  findUserTotalCount,
  findUsers,
  findUserTotalCountByEmail,
  findUserTotalCountByPhone,
  findUserTotalCountByFullName,
  findUserTotalCountByAgeRange,
} = require("../services/user");

const register = async (req, res) => {
  try {
    const info = req.body;
    const hashedPassword = await hashGenerator(info.password, 10);

    if (!hashGenerator)
      return res.status(500).json({ message: "Registration failed" });

    info.password = hashedPassword;

    let user = await createUser(info);
    user = JSON.parse(JSON.stringify(user));

    const { password, ...userInfo } = user;

    const token = await tokenGenerator(userInfo);

    if (!token) return res.status(500).json({ message: "Registration failed" });

    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json({ message: "Registration failed!" });
  }
};

const login = async (req, res) => {
  try {
    const info = req.body;

    let admin = await findAdmin(info.email);

    if (admin) {
      admin = JSON.parse(JSON.stringify(admin));
      const validPassword = await hashVerification(
        admin.password,
        info.password
      );

      if (!validPassword) {
        return res.status(500).json({ message: "Login failed!" });
      }

      const { password, ...adminInfo } = admin;

      const token = await tokenGenerator({ ...adminInfo, role: "admin" });

      if (!token) return res.status(500).json({ message: "Login failed!" });

      return res.status(200).json(token);
    } else {
      let user = await findUserInfoByEmail(info.email);
      user = JSON.parse(JSON.stringify(user));

      const validPassword = await hashVerification(
        user.password,
        info.password
      );

      if (!validPassword) {
        return res.status(500).json({ message: "Login failed!" });
      }

      const { password, ...userInfo } = user;

      const token = await tokenGenerator(userInfo);

      if (!token) return res.status(500).json({ message: "Login failed!" });

      return res.status(200).json(token);
    }
  } catch (error) {
    return res.status(500).json({ message: "Login failed!" });
  }
};

const getTotalUserCount = async (req, res) => {
  try {
    const count = await findUserTotalCount();

    return res.status(200).json({ count });
  } catch (error) {
    return res.status(404).json({ message: "Users not found." });
  }
};

const getTotalUserCountByEmail = async (req, res) => {
  try {
    const count = await findUserTotalCountByEmail(req.query.email);

    return res.status(200).json({ count });
  } catch (error) {
    return res.status(404).json({ message: "Users not found." });
  }
};

const getTotalUserCountByPhone = async (req, res) => {
  try {
    const count = await findUserTotalCountByPhone(req.query.phone);

    return res.status(200).json({ count });
  } catch (error) {
    return res.status(404).json({ message: "Users not found." });
  }
};

const getTotalUserCountByFullName = async (req, res) => {
  try {
    const count = await findUserTotalCountByFullName(req.query.fullName);

    return res.status(200).json({ count });
  } catch (error) {
    return res.status(404).json({ message: "Users not found." });
  }
};

const getTotalUserCountByAgeRange = async (req, res) => {
  try {
    const count = await findUserTotalCountByAgeRange(req.body);

    return res.status(200).json({ count });
  } catch (error) {
    return res.status(404).json({ message: "Users not found." });
  }
};

const getUsers = async (req, res) => {
  try {
    const { limit, page } = req.query;

    const users = await findUsers(limit, page);

    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: "User not found!" });
  }
};

const updateUsersStatus = async (req, res) => {
  try {
    const updateInfo = req.body;

    const user = await modifyUsersStatus(updateInfo);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Update user failed!" });
  }
};

const getUsersByFullName = async (req, res) => {
  try {
    const { name, limit, page } = req.query;

    const users = await findUsersByName(name, limit, page);

    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: "Users not found!" });
  }
};

const getUsersByEmail = async (req, res) => {
  try {
    const { email, limit, page } = req.query;
    const users = await findUsersByEmail(email, limit, page);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: "Users not found!" });
  }
};

const getUsersByPhone = async (req, res) => {
  try {
    const { phone, limit, page } = req.query;
    const users = await findUsersByPhone(phone, limit, page);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: "Users not found!" });
  }
};

const getUsersByAgeRange = async (req, res) => {
  try {
    const { range, limit, page } = req.body;
    const users = await findUsersByAgeRange(range, limit, page);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: "Users not found!" });
  }
};

module.exports = {
  register,
  login,
  getUsersByFullName,
  getUsersByEmail,
  getUsersByPhone,
  getUsersByAgeRange,
  updateUsersStatus,
  getTotalUserCount,
  getUsers,
  getTotalUserCountByEmail,
  getTotalUserCountByPhone,
  getTotalUserCountByFullName,
  getTotalUserCountByAgeRange,
};
