const express = require("express");
const db = require("../config/database");
const authModel = require("../models/auth");
const profileModel = require("../models/profile");
require("dotenv").config();
const app = express();
app.use(express.json());

exports.getOneUser = async (req, res) => {
  try {
    const result = await profileModel.findOne({
      where: {
        id: req.params.id,
      },
      raw: true,
      include: [
        {
          model: authModel,
          attributes: ["email"],
        },
      ],
    });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await profileModel.destroy({
      where: {
        id: userId,
      },
      include: [
        {
          model: authModel,
          cascade: true,
        },
      ],
    });
    return res.json(result);
  } catch (e) {
    console.log("error deleting user:", e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateOneUser = async (req, res) => {
  const authData = {
    email: req.body.email,
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
    const userId = req.params.id;
    const profResult = await profileModel.update(profileData, {
      where: {
        id: userId,
      },
    });

    const authResult = await authModel.update(authData, {
      where: {
        id: userId,
      },
    });

    result = { profResult, authResult };
    
    return res.json(result);
  } catch (e) {
    console.log("error deleting user:", e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
