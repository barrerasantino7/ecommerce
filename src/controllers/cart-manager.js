const CartModel = require("../models/cart.model.js");

class CartManager {
    async crearCarrito(){
        try {
            const nuevoCarrito= new CartModel({product:[]})
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear un carrito")
            throw error;
        }
    }

    async getCarritoById(id){
        try{
            const cart = await CartModel.findById(id);

            if(!cart){
                console.log("No hay carrito con ese id")
                return null;
            }

            return cart;
        }catch(error){
            console.log("Error al obtener un carrito por id")
            throw error;
        }
    }

    async agregarProductoAlCarrito(productId,cartId, quantity = 1){
        try{
            const carrito = await this.getCarritoById(cartId);
            const existeProducto = carrito.products.find((item)=> item.product.toString() === productId)

            if(existeProducto){
                existeProducto.quantity += quantity;
            }else{
                carrito.products.push({product: productId, quantity})
            }

            //Marcamos la propiedad "products" como modificada, es algo que nos pide la base de datos:
            carrito.markModified("product");
            await carrito.save();
            return carrito;
        }catch(error){
            console.log("Error al obtener un carrito por id")
            throw error;
        }
    }
}

module.exports = CartManager;