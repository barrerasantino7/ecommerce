const ProductModel = require("../models/products.model.js");
const CartRepository = require("../repositories/cart.repository.js");
const cartRepository = new CartRepository();

class Viewscontroller{
    /////////////////////////
    async renderHome(req,res){
        res.render("home")
    }
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
    /*
    async renderProductById(req,res){
        res.render("producto-por-id")
    }
    */
    async renderProducts(req, res) {
        try {
            const { page = 1, limit = 4 } = req.query;

            const skip = (page - 1) * limit;

            const productos = await ProductModel
                .find()
                .skip(skip)
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments();

            const totalPages = Math.ceil(totalProducts / limit);

            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;


            const nuevoArray = productos.map(producto => {
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
}

module.exports = Viewscontroller;