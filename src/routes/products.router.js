const express = require("express");
const router = express.Router();

//const productModel = require("../models/products.model.js");

const productManager = require("../controllers/product-manager.js");
const ProductManager = new productManager();


//1)Obtener todos los productos o con algun limite
router.get("/products", async (req,res)=>{
    const getProducts = await ProductManager.getProducts();
    const limite = req.query.limit; // (?limit=4)

    let products = getProducts.map((product)=>{
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
    });
    
    if(limite){
        products = products.slice(0, limite); 
        res.render("productos", {products: products})
    }else{
        res.render("productos", {products: products})
    }

});

//2)Obtener producto por id
router.get("/products/:id", async (req,res)=>{
    const id = req.params.id

    const getProductById = await ProductManager.getProductById(id);

    if(getProductById){
        const product = {
            id: getProductById._id,
            title: getProductById.title,
            description: getProductById.description,
            code: getProductById.code,
            price: getProductById.price,
            status: getProductById.status,
            stock: getProductById.stock,
            category: getProductById.category,
            thumbnail: getProductById.thumbnail
        };
    
        res.render("producto-por-id", product);
    } else {
        res.send("Producto no encontrado");
    }
});

//3)Sumar producto está ubicado en realtimeproducts.js

//4)Borrar producto por id
router.delete("/products/:id", async (req,res)=>{
    const id = req.params.id;
    
    await ProductManager.deleteProductById(id);

    res.redirect("/products")

});

//5)Actualizar producto por id
router.put("/products/:id", async (req,res)=>{

    const id = req.params.id;
    const updateCamp = req.body;

    await ProductManager.updateProduct(id,updateCamp);

    res.redirect("/products")
})
module.exports = router; 