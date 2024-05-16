const express = require("express");
const router = express.Router();

const productManager = require("../controllers/product.manager.js");
const ProductManager = new productManager;

router.get("/products", ProductManager.getProducts);
//router.get("/product/:pid", ProductManager.getProductById);
router.post("/createproduct", ProductManager.addProduct);
router.put("/product/:pid", ProductManager.updateProduct);
router.delete("/delete/:pid", ProductManager.deleteProduct);


module.exports = router;