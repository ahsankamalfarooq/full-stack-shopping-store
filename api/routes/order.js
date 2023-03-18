const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const CryptoJs = require('crypto-js');
const Order = require("../models/Order");



//Create Order

router.post("/", verifyTokenAndAdmin, async (req,res,next) => {
    const newOrder = new Order(req.body)
    
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch(err) {
        res.status(500).json(err)
    }


})


// UPDATE Order

router.put("/:id" ,verifyTokenAndAdmin , async (req,res) => {


    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set : req.body     
        }, {new : true})

        res.status(201).json(updatedOrder)

    } catch(err) {
        res.status(500).json(err)
    }

}) 


//                     //DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req,res,next) => {
    try {
        const deleteOrder = await Order.findByIdAndDelete({_id : req.params.id})
        if(!deleteOrder) {
            res.status(401).json("Order Not Found")
        } 
        res.status(201).json("Order Has Been Deleted" + deleteOrder)

    } catch (err) {
        res.status(500).json(err);
    }
})


//                         // GET User Order


router.get("/find/:userId",verifyTokenAndAuthorization ,async (req,res,next) => {
    try {
        const order = await Order.find({userId : req.params.userId})
        if(!order) {
            res.status(401).json("Order Not Found")
        } 
        // const { password, ...others } = Order._doc;

        res.status(200).json(order)

    } catch (err) {
        res.status(700).json(err); 
    } 
})

//GET ORDERS

router.get("/" ,verifyTokenAndAdmin,async (req,res,next) => {
    try {
        const order = await Order.find()
        if(!order) {
            res.status(401).json("Order Not Found")
        } 
        // const { password, ...others } = Order._doc;

        res.status(200).json(order)

    } catch (err) {
        res.status(500).json(err); 
    } 
})


// Get Monthly Income

router.get("/income",verifyTokenAndAdmin,async (req,res,next) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1 ))
    const PreviousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1 ))
    // console.log(date)
    // console.log(lastYear)
    try{

        const income = await Order.aggregate([
            { $match : {createdAt : { $gte : PreviousMonth}, ...(productId) && {
                products : {$elemMatch: {productId : productId }}
            } }},
            {$project : { month : { $month : "$createdAt"},
            sales : "$amount",
        }
        },
            {$group :{_id : "$month" 
            , total : {$sum: "$sales"},
        }
    }

        ]);

        if(!income) {
            res.status(401).json("POii")
        }
        res.status(200).json(income)

    } catch(err) {
        res.status(500).json(err)
    }
})





 module.exports = router