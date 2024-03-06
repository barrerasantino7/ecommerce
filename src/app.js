const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const multer = require("multer");


//Importamos las Rutas
const inicioRouter = require("./routes/inicio.router.js");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const messagesRouter = require("./routes/messages.router.js");
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
app.use("/", messagesRouter);
app.use("/", realTimerRouter);

app.listen(PUERTO,()=>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`)
});


//Coneccion a la base de datos
mongoose.connect("mongodb+srv://barrerasantino7:44064330@cluster0.rbu84ul.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("Conectado a la Base de Datos"))
.catch(error =>console.log(error))