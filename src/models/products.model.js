const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    status:{
        type: String,
        require: true
    },
    stock:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    thumbnail:{
        type: [String],
    }
})

productsSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model("products", productsSchema);

module.exports = productsModel;