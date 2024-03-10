const mongoose = require("mongoose");

//Nuevo modelo de mensajes. Cuenta con el nombre del usuario y el mensaje que brinda
const chatSchema = new mongoose.Schema({
    user: String,
    message: String
});
//Creamos el modelo guardando tanto la coleccion a la que pertenece y el esquema que debe de utilizar
const chatModel = mongoose.model("messages", chatSchema);

module.exports = chatModel;