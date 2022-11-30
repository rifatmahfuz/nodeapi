const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");

const con = require("../controllers/coreController");
const user = require("../controllers/userController");

router.post("/register", con.register);
router.post("/login", con.login);
router.get("/users/:id", authorize, user.getOneUser);
router.delete("/users/:id", authorize, user.deleteOneUser);
router.put("/users/:id", authorize, user.updateOneUser);

module.exports = router;
