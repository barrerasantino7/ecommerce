const express = require("express");
const router = express.Router();
const sessionModel = require("../models/session.model.js");
const {isValidPassword} = require("../utils/hashbcryp.js");
const passport = require("passport");

router.get("/login", (req,res)=>{
    res.render("login");
})

router.post("/login", passport.authenticate("login", {failureRedirect: "/faillogin"}), async (req, res) => {
    if(!req.user){
        return res.status(400).send({status:"error"});
    }else{
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email:req.user.email
        };
    
        req.session.login = true;
        res.redirect("/profile");
    }
})

router.get("/faillogin", async (req, res) => {
    res.send({error: "Fallo todoooooo el login"});
})

router.get("/api/sessions/github", passport.authenticate("github", {scope: ["user:email"]}) ,async (req, res)=> {})
router.get("/api/sessions/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}) ,async (req, res)=> {
    //La estrategia de GitHub me va a retornar el usuario, entonces lo agregamos a nuestra session. 
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile");
})


router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})

/*
router.post("/login", async (req,res)=>{
    //const {email, password} = req.body;

    const email = req.body.email;
    const password = req.body.password;

    try {
        const usuario = await sessionModel.findOne({email: email})

        if(usuario){
            
        if(isValidPassword(password, usuario)){
            req.session.login = true;
            req.session.user = { ...usuario._doc };
            res.redirect("/profile")
            //res.status(200).send({messsage:"Login correctooo"})
        }else{
            //res.status(401).send({messsage:"Contraseña incorrecta"})
            res.redirect("/login")
        }
        }else{
            res.status(400).send({message:"Usuario no encontrado"})
        }
    } catch (error) {
        res.status(400).send({error:"Error al ingresar"})
    }
})
*/



module.exports = router;
