const express = require("express");
const router = express.Router();
const viewController = require("../controllers/view.controller.js")
const ViewController = new viewController();
const checkUserRole = require("../middleware/checkrole.js");
const passport = require("passport");

router.get("/", ViewController.renderHome);
router.get("/login", ViewController.renderLogin);
router.get("/register", ViewController.renderRegister);
///////////////////////////
router.get("/createproduct", ViewController.renderCreateProducts)
//router.get("/product/:id", ViewController.renderProductById)
router.get("/products", checkUserRole(['usuario']),passport.authenticate('jwt', { session: false }), ViewController.renderProducts);

module.exports = router;