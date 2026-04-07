const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("./config/env");
const routes = require("./routes");
const notFoundHandler = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: env.corsOrigin
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
