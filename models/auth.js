const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = require("../config/database");
class Auth extends Model {}

Auth.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: "auth", // Provide the name of the table
    timestamps: false,
  }
);

/**
 * Export the model, so that it can be used in any
 * page to execute CRUD operations on the app_posts table.
 */

module.exports = Auth;
