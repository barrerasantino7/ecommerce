const express = require("express");
const router = express.Router();

const CartController = require("../controllers/cart.controller.js");
const cartController = new CartController();

router.post("/carts/", cartController.newCart);
router.get("/carts/:cid", cartController.getCart);
router.post("/carts/:cid/product/:pid", cartController.addProductToCart);
router.delete("/carts/:cid/product/:pid", cartController.deleteProductToCart);
router.put("/carts/:cid", cartController.updateCart);
router.put("/carts/:cid/product/:pid", cartController.updateQuatityProducts);
router.delete("/carts/:cid", cartController.emptyCart);
router.post("/carts/:cid/purchase", cartController.finishBuying);

module.exports = router;