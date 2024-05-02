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
    }

})

const sessionModel = mongoose.model("users", sessionSchema);

module.exports = sessionModel;