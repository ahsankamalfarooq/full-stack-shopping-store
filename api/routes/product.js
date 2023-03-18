const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const CryptoJs = require('crypto-js');
const Product = require("../models/Product");



//Create Product

router.post("/", verifyTokenAndAdmin, async (req,res,next) => {
    const newProduct = new Product(req.body)
    
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch(err) {
        res.status(500).json(err)
    }


})


// UPDATE PRODUCT

router.put("/:id" , verifyTokenAndAdmin , async (req,res) => {


    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set : req.body     
        }, {new : true})

        res.status(200).json(updatedProduct)

    } catch(err) {
        res.status(500).json(err)
    }

}) 


                    //DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req,res,next) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete({_id : req.params.id})
        if(!deleteProduct) {
            res.status(401).json("Product Not Found")
        } 
        res.status(201).json("Product Has Been Deleted" + deleteProduct)

    } catch (err) {
        res.status(500).json(err);
    }
})


                        // GET A Product


router.get("/find/:id", async (req,res,next) => {
    try {
        const product = await Product.findById({_id : req.params.id}).select(" -password ")
        if(!product) {
            res.status(401).json("Product Not Found")
        } 
        // const { password, ...others } = product._doc;

        res.status(200).json(product)

    } catch (err) {
        res.status(500).json("err"); 
    } 
})


// Get ALl Users

router.get("/", async (req,res,next) => {
     
    const qNew = req.query.new;
    const qcategory = req.query.category;
    
    try {
        let products;

        if(qNew) {
            products = await Product.find().sort({createdAt : -1}).limit(5);
        } else if (qcategory) {
            products = await Product.find({
                categories : {
                    $in : [qcategory],
                },
            });
            
        } else {
            products = await Product.find();
        }
        
        if(!products) {
            res.status(401).json("User Not Found")
        } 
        // const { password, ...others } = user._doc;

        res.status(200).json(products)

    } catch (err) {
        res.status(500).json("err"); 
    } 
})


 module.exports = router