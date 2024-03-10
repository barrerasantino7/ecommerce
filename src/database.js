const mongoose = require("mongoose");

//Coneccion a la base de datos
mongoose.connect("mongodb+srv://barrerasantino7:44064330@cluster0.rbu84ul.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("Conectado a la Base de Datos"))
.catch(error =>console.log(error))