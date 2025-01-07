const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();
const app = express();

// Initial Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// Init Routes
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Hello World!" });
});

// init db
require("./dbs/init.mongodb");
// const { checkOverload } = require("./helpers/check.connectdb");
// checkOverload();

// Error handler

module.exports = app;
