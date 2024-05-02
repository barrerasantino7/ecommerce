const express = require("express");
const router = express.Router();
const sessionModel = require("../models/session.model");
const {createHash} = require("../utils/hashbcryp.js")
const passport = require("passport");

router.get("/register", (req,res)=>{
    res.render("register")
});

router.post("/register", passport.authenticate("register",{failureRedirect:"/failedregister"}), async (req,res)=>{
    if(!req.user){
        return res.status(400).send({status:"error"});
    }else{
        req.session.user ={
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email:req.user.email
        };
        req.session.login = true;
        res.redirect("/profile")
    }
})

router.get("/failedregister", (req, res) => {
    res.send({error: "Registro fallidoooooooo!"});
})


/*
router.post("/register", async (req,res)=>{
    const {first_name, last_name, email, password} = req.body;

    try {
        const user = await sessionModel.findOne({email: email})

        if(user){
            return res.status(400).send({messsage: "Ya existe un usuario con ese email"});
        }else{
            const newUser = await sessionModel.create({
                first_name, 
                last_name, 
                email, 
                password: createHash(password)
            });

            req.session.login = true; 
            req.session.user = {...newUser._doc};

            res.redirect("/products")
        }
    } catch (error) {
        res.status(400).send({message:"Error en el registro"})       
    }
})
*/
module.exports = router;