//Importamos el modelo
const ChatModel = require("../models/chat.model.js");

class  ChatManager{
    //Crea un nuevo elemento bajo los criterios establecidos en el modelo
    async newMessage(data){
        const newmessage = new ChatModel(data);

        //Guardamos ese nuevo elemento en la coleccion
        await newmessage.save();
    }

    //Endpoint donde trae todos los elementos de la collecion (a modo de historial)
    async getMessages(){
        const getmessages = await ChatModel.find()
        return getmessages;
    }
};

module.exports = ChatManager;