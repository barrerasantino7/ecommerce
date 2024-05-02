const ProductModel = require("../models/products.model")

class ProductManager {

    async addProduct({title,description, price,code,stock,category,thumbnails}){
        try {
            if(!title||!description||!price||!code||!stock||!category||!thumbnails){
                console.log("Todos los campos son obligatorios")
                return;
            }
            const existProduct = await ProductModel.findOne({code: code});

            if(existProduct){
                console.log("El codigo debe de ser unico")
                return;
            }

            const newProduct = new ProductModel({
                title,
                description,
                price,
                code,
                stock,
                category,
                thumbnails: thumbnails || []
            });

            await newProduct.save();

        } catch (error) {
            console.log("Error al agregar producto", error);
            throw error;
        }
    };

    async getProducts(){
        try{
            const products = await ProductModel.find()
            return products;
        }catch(error){
            console.log("Error al mostrar productos", error);
            throw error;
        }
    };

    async getProductById(id){
        try {
            const productById = await ProductModel.findById(id);
            if(!productById){
                console.log("Error al encontrar el producto")
                return null;
            }else{
                console.log("Producto encontrado")
                return productById;
            }
        } catch (error) {
            console.log("Error al mostrar el producto", error);
            throw error;
        }
    };

    async deleteProductById(id){
        try {
            const deleteProductById = await ProductModel.findByIdAndDelete(id);

            if(!deleteProductById){
                console.log("Producto no encontrado y eliminado")
                return null;
            }

            console.log("Producto eliminado");            
        } catch (error) {
            console.log("Error al borrar el producto", error);
            throw error;
        }
    };

    async updateProduct(id, productUpdate){
        try{
            const updateProduct = await ProductModel.findByIdAndUpdate(id, productUpdate);
             
            if(!updateProduct){
                console.log("Producto no actualizado")
                return null;
            }

            console.log("Producto actualizado");
            return updateProduct;
        }catch (error){
            console.log("Error al actualizar el producto", error);
            throw error;
        }
    }

    async getProductByCategory(category){
        const ProductsByCategory = await ProductModel.find({"category": category})
        return ProductsByCategory;
    }

    /*
    async getProductWithLimit(limit){
        try {
            const productsLimits = await ProductModel.find().limit(limit);
            return productsLimits
        } catch (error) {
            console.log("Error al limitar productos")
            throw error;
        }
    }
    */
}
module.exports = ProductManager;