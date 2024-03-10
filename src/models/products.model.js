const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: String,
        required: true
    },
    stock:{
        type: String,
        required: true
    },
    category:{
        type: String,
    },
    thumbnail:{
        type: [String],
    }
})

const productsModel = mongoose.model("products", productsSchema);

module.exports = productsModel;