const express = require("express");
const router = express.Router();

router.get("/carts", (req,res)=>{
    res.render("carrito");
});

module.exports = router;