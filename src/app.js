const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const multer = require("multer");
const socket = require("socket.io");
const cookieParser = require("cookie-parser");
const passport = require("passport")
const initializePassport = require("./config/passport.config.js");
const configObject = require("./config/config.js");
const {mongo_url, puerto} = configObject;
const compression = require("express-compression");
const addLogger = require("./middleware/loggermiddleware.js")

//Coneccion a la base de datos
require("./database.js")


//Importamos las Rutas
const cartsRouter = require("./routes/carts.router.js");
const chatRouter = require("./routes/chat.router.js");
const usersRouter = require("./routes/users.router.js");
const viwsrouter = require("./routes/views.router.js");
const productRouter = require("./routes/product.router.js");
const fakerProductsRouter = require("./routes/fakerProducts.router.js");

////////////////////////////////////////////////////////////////////////
//Middleware
app.use(express.static("./src/public"));
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(compression());
app.use(addLogger)
//AuthMiddleware
const authMiddleware = require("./middleware/authmiddleware.js");
app.use(authMiddleware);
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
//Middleware de session
/*
app.use(session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    //MongoStore
    store:MongoStore.create({
        mongoUrl:"mongodb+srv://barrerasantino7:44064330@cluster0.rbu84ul.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
    })
}))
*/
//Middleware passport
app.use(passport.initialize());
initializePassport();
app.use(cookieParser());

////////////////////////////////////////////////////////////////

//Configuración de handlebars: 
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Rutas
app.use("/", cartsRouter);
app.use("/", chatRouter);
app.use("/", usersRouter);
app.use("/", viwsrouter);
app.use("/", productRouter);
app.use("/", fakerProductsRouter);

//Levantamos el servidor y lo guardamos en una referenica
const httpServer = app.listen(PUERTO,()=>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`)
});

//LoggerTest
app.get("/loggerTest", (req,res)=>{
    req.logger.error("Error importante");
    req.logger.warning("Peligro!");
    req.logger.info("Estamos trabajando en el error, aguarde");

    res.send("Logs generados")
})

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
