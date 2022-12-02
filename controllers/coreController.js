const sequelize = require("../config/database");
const models = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const services = require("../services/register.services");

exports.register = async (req, res) => {
  const trx = await sequelize.transaction();
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const authData = {
    email: req.body.email.toLowerCase(),
    password: encryptedPassword,
  };

  const profileData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nid: req.body.nid,
    profilePhoto: req.body.profilePhoto,
    isMarried: req.body.isMarried,
    age: req.body.age,
  };

  try {
    //validating siggn-up inputs using joi
    const validate = await services.regValidator.validateAsync(req.body);
    //checking if the user already exists
    const emailChecker = authData.email;
    const oldUser = await models.Auth.findOne({
      where: { email: emailChecker },
    });
    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    const auth = await models.Auth.create(authData, { transaction: trx });
    let profile;

    if (auth && auth.id) {
      profileData.AuthId = auth.id;
      profile = await models.Profile.create(profileData, { transaction: trx });
    }

    const token = jwt.sign(
      { user_id: auth.id, email: authData.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // commiting the transaction
    await trx.commit();

    return res.status(201).json({
      message: "Record created successfully!",
      response: { profile, auth, token },
    });
  } catch (error) {
    await trx.rollback();
    console.log(error);
    return res.status(500).json({
      message: "Unable to create a record!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("please fill out email and password both");
    }

    const userExists = await models.Auth.findOne({
      where: { email: email.toLowerCase() },
    });

    if (
      !(userExists && (await bcrypt.compare(password, userExists.password)))
    ) {
      return res.status(400).send("Invalid Credentials");
    }

    const token = jwt.sign(
      { user_id: userExists.id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({ token: token, credentials: userExists });
  } catch (error) {
    console.log(error);
  }
};
