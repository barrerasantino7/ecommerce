const UserModel = require("../models/session.model.js");
const CartModel = require("../models/cart.model.js");
const {createHash, isValidPassword} = require("../utils/hashbcryp.js");
const jwt = require("jsonwebtoken");
const UserDto = require("../dto/user.dto.js");

class UserManager{
    async register(req,res){
        const {first_name, last_name, email, password} = req.body

        try {
            const searchEmail = await UserModel.findOne({email})
            if(searchEmail){
                return res.status(400).send("Usuario ya existente");
            }else{
                const newCart = new CartModel();
                await newCart.save();

                const newUser = new UserModel({
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                    cart: newCart._id
                })

                await newUser.save();

                const token = jwt.sign({user: newUser}, "secretword", {expiresIn:"3h"});

                res.cookie("coderCookieToken", token, {
                    maxAge: 10800000,
                    httpOnly: true
                });

                res.redirect("/profile")
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Error interno del servidor");
        }
    }

    async login (req,res){
        const {email, password} = req.body;
        try {
            const searchUser = await UserModel.findOne({email})
            if(!searchUser){
                return res.status(401).send("Usuario inexistente");
            }else{
                const passwordValid = isValidPassword(password,searchUser);
                if(!passwordValid){
                    return res.status(401).send("Contraseña incorrecta");
                }else{

                    const token = jwt.sign({user: searchUser}, "secretword", {expiresIn: "3h"})

                    res.cookie("coderCookieToken", token, {
                        maxAge: 10800000,
                        httpOnly: true
                    })
                    res.redirect("/profile")
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Error interno del servidor");
        }
    }

    async profile(req, res) {
        const userDto = new UserDto(req.user.first_name, req.user.last_name, req.user.role);
        const isAdmin = req.user.role === 'admin';
        res.render("profile", { user: userDto, isAdmin });
    }

    async logout(req,res){
        res.clearCookie("coderCookieToken")
        res.redirect("/login")
    }

    async isAdmin (req,res){
        if(req.user.user.role !== "admin"){
            return res.status(403).send("Acceso de negado, solo apto para administradores")
        }else{
            res.render("admin")
        }
    }
}

module.exports = UserManager;