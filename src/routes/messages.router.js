const express = require("express");
const router = express.Router();

router.get("/messages", (req,res)=>{
    res.render("mensajes")
});

module.exports = router;