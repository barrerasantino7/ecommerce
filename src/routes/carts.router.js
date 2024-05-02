const express = require("express");
const router = express.Router();

const cartmanager = require("../controllers/cart-manager.js");
const CartManager = new cartmanager

//Obtenemos el carrtio
router.get("/carts", (req,res)=>{
    res.render("carrito")
})
//1)Creamos un nuevo carrito
router.post("/carts", async (req,res)=>{
    try {
        const nuevoCarrito = await CartManager.crearCarrito();


        res.json(nuevoCarrito)
        //res.render("carrito", nuevoCarrito)
    } catch (error) {
        console.error("Error al crear un nuevo carrito", error);
        res.status(500).json({error: "Error interno del servidor"})
    }
})

//2)Listamos los productos que pertenecen a determinado carrito:
router.get("/carts/:cid", async (req,res)=>{
    const cartId = req.params.cid;

    try {
        const carrito = await CartManager.getCarritoById(cartId);
        res.json(carrito)
        //res.render("carrito", carrito)
    } catch (error) {
        console.error("Error al obtener el carrito", error)
        res.status(500).json({error: "Error interno del servidor"})
    }
})


//3)Agregar productos a distintos carritos:
router.post("/carts/:cid/product/:pid", async (req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await CartManager.agregarProductoAlCarrito(productId,cartId,quantity);
        res.json(actualizarCarrito)
        //res.render("carrito",actualizarCarrito)
    } catch (error) {
        console.error("Error al agregar un producto al carrito", error)
        res.status(500).json({error: "Error interno del servidor"})
    }
})

module.exports = router;