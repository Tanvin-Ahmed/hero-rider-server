const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./src/db/db");

const indexRouter = require("./src/routes/index");
const usersRouter = require("./src/routes/users");
const paymentsRouter = require("./src/routes/payments");
const { hashGenerator } = require("./src/utils/auth/hashGenerator");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/payments", paymentsRouter);

module.exports = app;
