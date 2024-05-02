const express = require("express");
const router = express.Router();

router.get("/product/:id", (req,res)=>{
    res.render("producto-por-id")
});

module.exports = router;