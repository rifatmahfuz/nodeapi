const app = require("./src/app");
const sequelize = require("./src/config/database");
const port = process.env.PORT;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("DB Models synchronized successfully!");
    console.log(`Server is up and running at: http://localhost:${port}`);
  });
});
