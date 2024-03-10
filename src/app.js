const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const multer = require("multer");
const socket = require("socket.io")
//Coneccion a la base de datos
require("./database.js")


//Importamos las Rutas
const inicioRouter = require("./routes/inicio.router.js");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const chatRouter = require("./routes/chat.router.js");
const realTimerRouter = require("./routes/realtimeproducts.router.js")

//Middleware
app.use(express.static("./src/public"));
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
//Middleware Multer
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, "./src/public/img");
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname);
    }
})
app.use(multer({storage}).single("image"));


//Configuración de handlebars: 
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Prueba
app.get("/",(req, res)=>{
    res.render("index");
});

//Rutas
app.use("/", inicioRouter);
app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", chatRouter);
app.use("/", realTimerRouter);

//Levantamos el servidor y lo guardamos en una referenica
const httpServer = app.listen(PUERTO,()=>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`)
});


//CHAT
//Usamos la referencia del servidor para usarlo con Websocket
const io = new socket.Server(httpServer);

//Importamos chat manager para pode manipular la informacion recibida desde el main.js
const chatmanager = require("./controllers/chat-manager.js");
const ChatManager = new chatmanager;

//Evento inicial para conectarnos al cliente (servidor-cliente)
io.on("connection", (socket)=>{
    console.log("Coneccion establecida")

    //test
    socket.on("test", (data)=>{
        console.log(data)
    })

    //Recibimos el mensaje que el cliente nos envia
    socket.on("message", async (data)=>{

        //Con ese mensaje creamos un nuevo "objeto" donde se guarda user y message
        await ChatManager.newMessage(data);

        //Guardamos la informacion dentro de la base de datos
        const info = await ChatManager.getMessages();

        //Emitimos el mensaje de respuesta (una actualizacion del historial de chat con el nuevo mensaje) REVISAR POR QUE LLEVA IO
        io.emit("messagesLog", info )
    })
})
