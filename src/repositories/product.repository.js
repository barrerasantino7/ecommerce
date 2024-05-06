const ProductModel = require("../models/products.model.js")

class ProductRepository{
    async addProduct({title, description, code, price, status, stock, category, thumbnails}){
        try {
            if(!title || !description || !price || !code || !stock || !category || !status){
                return console.log("Todos los campos son obligatorios")
            }else{
                const searchCode = await ProductModel.findOne({code: code})
                if(searchCode){
                    return console.log("El código debe de ser unico")
                }else{
                    const newProduct = new ProductModel();
                    newProduct.title = title;
                    newProduct.description = description;
                    newProduct.code = code;
                    newProduct.price = price;
                    newProduct.status = status;
                    newProduct.stock = stock;
                    newProduct.category = category;
                    newProduct.thumbnail = thumbnails;

                    await newProduct.save();

                    return newProduct;
                }
            }
        } catch (error) {
            console.error("Error en addProduct:", error);
            throw error;
        }
    }

    async getProduct(limit = 10, page = 1, sort, query){
        try {
            const skip = (page - 1) * limit;

            let queryOptions = {};

            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }

            const productos = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments(queryOptions);
            
            const totalPages = Math.ceil(totalProducts / limit);
            
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
            

            return {
                docs: productos,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };
        } catch (error) {
            throw new Error("Error");
        }
    }
    async getProductById(id){
        try {
            const productById = await ProductModel.findById(id)

            if(!productById){
                console.log("Producto no encontrado")
                return null
            }else{
                return productById
            }
        } catch (error) {
            throw new Error("Error");
        }

    }
    async deleteProduct(id){
        try {
            const deleteById = await ProductModel.findByIdAndDelete(id);
            if(!deleteById){
                console.log("No se encuentra el producto que se quiere eliminar");
                return null
            }else{
                console.log("Producto eliminado");
                return deleteById
            }
        } catch (error) {
            throw new Error("Error");
        }
    }
    async updateProduct(id, newProduct){
        try {
            const updateById = await ProductModel.findByIdAndUpdate(id, newProduct);

            if(!updateById){
                console.log("No se encuentra el producto para actualizar");
                return null;
            }else{
                console.log("Producto actualizado");
                return updateById
            }
        } catch (error) {
            
        }
    }
}

module.exports = ProductRepository;