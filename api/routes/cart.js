const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const CryptoJs = require('crypto-js');
const Cart = require("../models/Cart");



//Create Cart

router.post("/", verifyToken, async (req,res,next) => {
    const newCart = new Cart(req.body)
    
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch(err) {
        res.status(500).json(err)
    }


})


// UPDATE Cart

router.put("/:id" , verifyTokenAndAuthorization , async (req,res) => {


    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set : req.body     
        }, {new : true})

        res.status(200).json(updatedCart)

    } catch(err) {
        res.status(500).json(err)
    }

}) 


//                     //DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req,res,next) => {
    try {
        const deleteCart = await Cart.findByIdAndDelete({_id : req.params.id})
        if(!deleteCart) {
            res.status(401).json("Cart Not Found")
        } 
        res.status(201).json("Cart Has Been Deleted" + deleteCart)

    } catch (err) {
        res.status(500).json(err);
    }
})


//                         // GET A Cart


router.get("/find/:userId",verifyTokenAndAuthorization ,async (req,res,next) => {
    try {
        const Cart = await Cart.findOne({userId : req.params.userId})
        if(!Cart) {
            res.status(401).json("Cart Not Found")
        } 
        // const { password, ...others } = Cart._doc;

        res.status(200).json(Cart)

    } catch (err) {
        res.status(500).json("err"); 
    } 
})


// Get ALl Carts

router.get("/", verifyTokenAndAdmin,async (req,res,next) => {
     

    
    try {
        const Carts = await Cart.find();
        if(!Carts) {
            res.status(401).json("User Not Found")
        } 
        // const { password, ...others } = user._doc;


        res.status(200).json(Carts)

    } catch (err) {
        res.status(500).json("err"); 
    }
})


 module.exports = router