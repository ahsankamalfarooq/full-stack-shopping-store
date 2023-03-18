const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const CryptoJs = require('crypto-js');
const User = require("../models/User");


router.put("/:id" , verifyToken , async (req,res) => {
    // if(req.user.id === req.params.id || req.user.isAdmin) {
    // } (we hve to write it for every req , so storing it in new constant to prevent the writing)

    if(req.body.password) {
        req.body.password = CryptoJs.AES.encrypt(req.body.password, 
            PASS_SEC).toString()
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body     
        }, {new : true})

        res.status(200).json(updatedUser)

    } catch(err) {
        res.status(500).json(err)
    }

}) 


//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req,res,next) => {
    try {
        const deleteUser = await User.findByIdAndDelete({_id : req.params.id})
        if(!deleteUser) {
            res.status(401).json("User Not Found")
        } 
        res.status(201).json("User Has Been Deleted" + deleteUser)

    } catch (err) {
        res.status(500).json(err);
    }
})


// GET A USERS


router.get("/find/:id", verifyTokenAndAdmin, async (req,res,next) => {
    try {
        const user = await User.findById({_id : req.params.id}).select(" -password ")
        if(!user) {
            res.status(401).json("User Not Found")
        } 
        // const { password, ...others } = user._doc;

        res.status(200).json(user)

    } catch (err) {
        res.status(500).json("err"); 
    } 
})


// Get ALl Users

router.get("/", verifyTokenAndAdmin, async (req,res,next) => {
    
    const query = req.query.new;
    
    try {
        const users = query ? await User.find().sort({_id : -1}).limit(1) : await User.find();
        // .select(" -password ")
        if(!users) {
            res.status(401).json("User Not Found")
        } 
        // const { password, ...others } = user._doc;

        res.status(200).json(users)

    } catch (err) {
        res.status(500).json("err"); 
    } 
})


//Get Users Stats


router.get("/stats", verifyTokenAndAdmin, async (req,res,next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1 ))
    // console.log(date)
    // console.log(lastYear)
    try{

        const data = await User.aggregate([
            { $match : {createdAt : { $gte : lastYear}}},
            {$project : {month : { $month : "$createdAt"},},},
            {$group :{_id : "$month" 
            , count : {$sum: 1},
        }
    }
        
        ]);

 
        if(!data) {
            res.status(401).json("POTp")
        }
        res.status(200).json(data)

    } catch(err) {
        res.status(500).json("err")
    }
});

module.exports = router