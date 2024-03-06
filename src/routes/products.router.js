const express = require("express");
const router = express.Router();

const productModel = require("../models/products.model.js");

router.get("/products", async (req, res)=>{

    const getProducts = await productModel.find();

    const products = getProducts.map((product)=>{
        return {
            id: product._id,
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status: product.status,
            stock: product.stock,
            category: product.category,
            thumbnail: product.thumbnail
        }
    })

    res.render("productos", {products: products});
});

module.exports = router; 