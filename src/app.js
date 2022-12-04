require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const sequelize = require("./config/database");

app.use(express.json());
app.use("", routes);

app.use(express.urlencoded({ extended: true }));

const initApp = async () => {
  console.log("Testing the database connection..");
  // Testing the connection.
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};

initApp();

module.exports = app;
