const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: String,
    status: String,
    stock: String,
    category: String,
    thumbnail: String
});

const productsModel = mongoose.model("products", productsSchema);

module.exports = productsModel;