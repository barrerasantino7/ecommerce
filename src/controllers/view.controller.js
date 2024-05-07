const ProductModel = require("../models/products.model.js");
const CartRepository = require("../repositories/cart.repository.js");
const cartRepository = new CartRepository();
const productManager = require("../repositories/product.repository.js");
const ProductManager = new productManager();

class Viewscontroller{
    /////////////////////////
    async renderHome(req,res){
        res.render("home")
    }
    /////////////////////////
    /*
    async renderChat (req, res){
        res.render("chat");
    }
    */
    //////////////////////////////
    async renderLogin(req,res){
        res.render("login")
    }
    async renderRegister(req,res){
        res.render("register")
    }
    async renderProfile(req,res){
        res.render("profile")
    }
    //////////////////////////////
    async renderCreateProducts(req,res){
        res.render("createproduct")
    }
    async renderProducts(req, res) {
        try {
            const { page = 1, limit = 4 } = req.query;

            const skip = (page - 1) * limit;

            const products = await ProductModel
                .find()
                .skip(skip)
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments();

            const totalPages = Math.ceil(totalProducts / limit);

            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;


            const nuevoArray = products.map(producto => {
                const { _id, ...rest } = producto.toObject();
                return { id: _id, ...rest }; // Agregar el ID al objeto
            });


            const cartId = req.user.cart.toString();
            //console.log(cartId);

            res.render("productos", {
                products: nuevoArray,
                hasPrevPage,
                hasNextPage,
                prevPage: page > 1 ? parseInt(page) - 1 : null,
                nextPage: page < totalPages ? parseInt(page) + 1 : null,
                currentPage: parseInt(page),
                totalPages,
                cartId
            });

        } catch (error) {
            console.error("Error al obtener productos", error);
            res.status(500).json({
                status: 'error',
                error: "Error interno del servidor"
            });
        }
    }

    //////////////////////////////////

    async renderCart (req, res){
        const cartId = req.params.cid;
    
        try{
            const cart = await cartRepository.getCartById(cartId);
    
          if (!cart) {
             console.log(`Doesn't exists cart with id ${cartId}`);
             return res.status(404).json({ error: "Cart not found" });
          }
    
          const productsInCart = cart.products.map(p => {
             const product =  p.product.toObject();
             const quantity = p.quantity;
             const totalPrince = product.price * quantity;

             total += totalPrince;

             return {
                product: { ...product, totalPrice },
                quantity,
                cartId
            };
          });
    
          res.render("carts", { products: productsInCart , total, cartId});
    
        }catch (error){
            console.log("Error add a new cart", error);
            res.status(500).json({error: "Server error"});
        }
    }
}

module.exports = Viewscontroller;