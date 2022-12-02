require("dotenv").config();
/**
 * Importing Sequelize.
 */
const Sequelize = require("sequelize");

const connectionPoolOptions = {
  max: 300,
  idle: 30000,
  acquire: 60000,
};
/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
const sequelize = new Sequelize(
  "nodedb",
  "root",
  "",

  {
    host: `localhost`,
    dialect: "mysql",
    pool: connectionPoolOptions,
    logging: false,
  }
);

/**
 * Export the Sequelize instance. This instance can now be
 * used in the app.js file to authenticate and establish a database connection.
 */
module.exports = sequelize;
