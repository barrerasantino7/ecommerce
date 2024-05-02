const express = require("express");
const router = express.Router();
const sessionModel = require("../models/session.model.js");

router.get("/profile", async (req,res)=>{{
    if(req.session.login){
        const user = req.session.user
        res.render("profile", {user: user})
    }else{
        res.redirect("/login")
    }
}})

module.exports = router;