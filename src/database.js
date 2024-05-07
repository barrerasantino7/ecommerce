const mongoose = require("mongoose");

const configObject = require("./config/config.js");
const{mongo_url} = configObject;

//Coneccion a la base de datos
mongoose.connect(mongo_url)
.then(()=>console.log("Conectado a la Base de Datos"))
.catch(error =>console.log(error))