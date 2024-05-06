const productRepository = require("../repositories/product.repository.js");
const ProductRepository = new productRepository;

class ProductManager{
    async addProduct (req,res){
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        try {
            const newProduct = await ProductRepository.addProduct({title, description, code, price, status, stock, category, thumbnails})
            
            res.redirect("/createproduct")
        } catch (error) {
            res.status(500).send("Error al crear un nuevo producto");
        }
    }
    async getProducts(req, res) {
        try {
            let { limit = 10, page = 1, sort, query } = req.query;

            const productos = await productRepository.obtenerProductos(limit, page, sort, query);
           
            res.json(productos);
        } catch (error) { 
            res.status(500).send("Error");
        }
    }
    
    async getProductById (req,res){
        const pid = req.params.pid
        try {
            const productById = await ProductRepository.getProductById(pid);
            if(!productById){
                return res.status(400).send("Producto no encontrado")
            }else{
                res.json(productById)
            }
        } catch (error) {
            res.status(500).send("Error al obtener producto por id");
        }
    }
    
    async deleteProduct(req, res) {
        const id = req.params.pid;
        try {
            let respuesta = await productRepository.eliminarProducto(id);

            res.json(respuesta);
        } catch (error) {
            res.status(500).send("Error al eliminar el producto");
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.pid;
            const productoActualizado = req.body;

            const resultado = await productRepository.actualizarProducto(id, productoActualizado);
            res.json(resultado);
        } catch (error) {
            res.status(500).send("Error al actualizar el producto");
        }
    }
}

module.exports = ProductManager;