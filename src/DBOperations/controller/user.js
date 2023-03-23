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
    const { updateInfo } = req.body;

    const user = await modifyUsersStatus(updateInfo);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Update user failed!" });
  }
};

const getUsersByFullName = async (req, res) => {
  try {
    const name = req.query.name;

    const users = await findUsersByName(name);

    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: "Users not found!" });
  }
};

const getUsersByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const users = await findUsersByEmail(email);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: "Users not found!" });
  }
};

const getUsersByPhone = async (req, res) => {
  try {
    const phone = req.query.phone;
    const users = await findUsersByPhone(phone);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: "Users not found!" });
  }
};

const getUsersByAgeRange = async (req, res) => {
  try {
    const range = req.body;
    const users = await findUsersByAgeRange(range);
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
};
