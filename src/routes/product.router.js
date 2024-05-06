const express = require("express");
const router = express.Router();

const productManager = require("../controllers/product.manager.js");
const ProductManager = new productManager;

router.post("/createproduct", ProductManager.addProduct);
router.get("/product/:pid", ProductManager.getProductById);
router.delete("delete/:pid", ProductManager.deleteProduct);


module.exports = router;