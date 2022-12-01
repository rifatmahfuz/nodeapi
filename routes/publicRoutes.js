const express = require("express");
const router = express.Router();

const con = require("../controllers/coreController");
const user = require("../controllers/userController");

router.get("/", (req, res) => res.send("NodeAPI Server is running"));

router.post("/register", con.register);
router.post("/login", con.login);

module.exports = router;
