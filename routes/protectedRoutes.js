const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");

const con = require("../controllers/coreController");
const user = require("../controllers/userController");

router.get("/users/:id", authorize, user.getUserData);
router.delete("/users/:id", authorize, user.deleteUserData);
router.put("/users/:id", authorize, user.updateUserData);

module.exports = router;
