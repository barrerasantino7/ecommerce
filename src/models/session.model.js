const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({

    first_name:{
        type:String,
        required: true
    },
    last_name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type: String,
        enum:['admin', 'usuario'],
        default: 'usuario'
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }
})

const sessionModel = mongoose.model("users", sessionSchema);

module.exports = sessionModel;