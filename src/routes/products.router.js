const express = require("express");
const router = express.Router();

//const productModel = require("../models/products.model.js");

const productManager = require("../controllers/product-manager.js");
const productsModel = require("../models/products.model.js");
const ProductManager = new productManager();

//1)Obtener todos los productos o con algun limite
router.get("/products", async (req,res)=>{
    const limit = parseInt(req.query.limit) || 4;
    const page = req.query.page || 1 ;
    //const getProductsLimit = await ProductManager.getProductWithLimit(limit);

    const productsPage = await productsModel.paginate({},{limit, page});

    const productsResultadoFinal = productsPage.docs.map( product =>{
        return {_id, title, description, code, price, status, stock, category, thumbnail} = product.toObject();
     })

    res.render("productos", {products: productsResultadoFinal,
        hasPrevPage: productsPage.hasPrevPage,
        hasNextPage: productsPage.hasNextPage,
        prevPage: productsPage.prevPage,
        nextPage: productsPage.nextPage,
        currentPage: productsPage.page,
        totalPages: productsPage.totalPages});
}),

//Obtener por categoria
router.get("/products/:category", async (req,res)=>{
    const category = req.params.category;

    const ProductsByCategory = await ProductManager.getProductByCategory(category)

    let products = ProductsByCategory.map((product)=>{
        return{
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
})

//2)Obtener producto por id
router.get("/product/:id", async (req,res)=>{
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

    res.redirect("/productos")

});

//5)Actualizar producto por id
router.put("/products/:id", async (req,res)=>{

    const id = req.params.id;
    const updateCamp = req.body;

    await ProductManager.updateProduct(id,updateCamp);

    res.redirect("/productos")
})
module.exports = router; 


/*
    let products = getProductsLimit.map((product)=>{
        return{
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
    */