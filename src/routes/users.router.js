const express = require("express");
const router = express.Router();
const passport = require("passport")

const  usermanager = require("../controllers/user.manager.js")
const UserManager = new usermanager;

router.post("/register", UserManager.register);
router.post("/login", UserManager.login);
router.get("/profile", passport.authenticate("jwt", { session: false }), UserManager.profile);
router.get("/logout", UserManager.logout);

module.exports = router;