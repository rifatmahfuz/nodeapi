const express = require("express");
const router = express.Router();
const con = require("../controllers/coreController");
const user = require("../controllers/userController");

router.post("/register", con.register);
router.post("/login", con.login);
router.get("/users/:id", user.getOneUser);
router.delete("/users/:id", user.deleteOneUser);
router.put("/users/:id", user.updateOneUser);

module.exports = router;
