require("dotenv").config();
const express = require("express");
const app = express();
const publicRouter = require("./routes/publicRoutes");

const authModel = require("./models/auth");
const profileModel = require("./models/profile");

const sequelize = require("./config/database");

const port = process.env.PORT;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("", publicRouter);

const initApp = async () => {
  console.log("Testing the database connection..");
  /**
   * Testing the connection.
   * using authenticate() function to test if the connection works.
   */
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    app.listen(port, () => {
      console.log(`Server is up and running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};

initApp();

// One-To-One association
profileModel.belongsTo(authModel, {
  onDelete: "CASCADE",
});

sequelize.sync();
