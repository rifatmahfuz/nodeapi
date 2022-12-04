const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const user = require("../controllers/userController");

router.get("/users/:id", authorize, user.getUserData);
router.delete("/users/:id", authorize, user.deleteUserData);
router.put("/users/:id", authorize, user.updateUserData);
router.put("/users/uploadImage/:id", authorize, user.addImage);

module.exports = router;
