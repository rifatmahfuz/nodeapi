const express = require("express");
const db = require("../config/database");
const authModel = require("../models/auth");
const profileModel = require("../models/profile");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const authData = {
    email: req.body.email,
    password: hashedPassword,
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
    const auth = await authModel.create(authData);
    let profile;

    if (auth && auth.id) {
      profileData.authId = auth.id;
      profile = await profileModel.create(profileData);
    }

    return res.status(201).json({
      message: "Record created successfully!",
      response: { profile, auth },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to create a record!",
    });
  }
};
