console.log("Conectado");
const socket = io();


let user;
const chatBox = document.getElementById("chatBox");

//Esta funcion genera el nombre del usuario
Swal.fire({
    title:"Identificate",
    input: "text",
    text: "Ingrese un usuario para identificarse en el chat",
    inputValidator: (value)=>{
        return !value && "Necesitas escribir un nombre para continuar"
    },
    allowOutsideClick: false,
}).then(result =>{
    user = result.value
    console.log(user)//Revisa que esté correctamente guardado
})//Guardamos la informacion que el user nos brindo


//test
socket.emit("test", "Hola servidor");


//Escuhamos el evento
chatBox.addEventListener("keyup",(event)=>{
    if(event.key === "Enter"){
        if(chatBox.value.trim().length>0){//trim nos permite sacar los espacios en blanco al principio y al final del string
            //Si el mensaje tiene mas de 0 caracteres, lo enviamos al servidor.
            socket.emit("message",{user: user, message: chatBox.value});// Emitimos el mensaje con la ruta message y le enviamos dos cosas, el user y el value del chatbox

            chatBox.value = "";//Limpia el chatBox para despues seguir escribiendo
        }
    }
})

socket.on("messagesLog", (data)=>{//Recibimos el array de messages

    //Declaramos el parrafo donde se van a visualizar los mensajes
    let log = document.getElementById("messagesLogs");
    //Declaramos una variable donde se van a guardar los mensajes
    let mensajes = "";
    //Por cada grupo de (user y messages) Creamos un string que concatene el user + el mensaje y la variable mensajes y lo volvemos a guardar en la variable mensajes
    data.forEach(mensaje => {
        mensajes = mensajes + `${mensaje.user} dice: ${mensaje.message} <br>`//El br es para que se coloquen uno abajo del otro
    });
    //Insertamos en formato html la actualizacion de la variable mensajes
    log.innerHTML = mensajes;
})