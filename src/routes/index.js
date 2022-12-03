const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

router.use("", userRoutes);
router.use("", authRoutes);

module.exports = router;
