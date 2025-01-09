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
app.use("/", require("./routes"));

// init db
// require("./dbs/init.mongodb");
// const { checkOverload } = require("./helpers/check.connectdb");
// checkOverload();

// Error handler

module.exports = app;
