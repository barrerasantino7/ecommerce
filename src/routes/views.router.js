const express = require("express");
const router = express.Router();
const viewController = require("../controllers/view.controller.js")
const ViewController = new viewController();
const checkUserRole = require("../middleware/checkrole.js");
const passport = require("passport");

//Home
router.get("/", ViewController.renderHome);
//Chat
//router.get("/chat", ViewController.renderChat)
//Users
router.get("/login", ViewController.renderLogin);
router.get("/register", ViewController.renderRegister);
//Products
router.get("/product/:pid", ViewController.renderProductById);
router.get("/createproduct", checkUserRole(['admin']), ViewController.renderCreateProducts);
router.get("/products", checkUserRole(['usuario']),passport.authenticate('jwt', { session: false }), ViewController.renderProducts);
//Carts
router.get("/carts/:cid", ViewController.renderCart);

module.exports = router;