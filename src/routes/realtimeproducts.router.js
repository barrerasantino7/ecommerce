const express = require("express");
const router = express.Router();
const productsModel = require("../models/products.model.js")

router.get("/realtime", (req,res)=>{
    res.render("tiemporeal");
});

router.post("/realtime", async (req,res)=>{

    const newProduct = new productsModel();
    newProduct.title = req.body.title;
    newProduct.description = req.body.description;
    newProduct.code = req.body.code;
    newProduct.price = req.body.price;
    newProduct.status = req.body.status;
    newProduct.stock = req.body.stock;
    newProduct.category = req.body.categoy;
    newProduct.thumbnail = req.body.thumbnail;

    await newProduct.save();
    res.redirect("/realtime")
});


module.exports = router;