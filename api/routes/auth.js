const router = require("express").Router();
const User = require ('../models/User')
const CryptoJs = require('crypto-js')
const {PASS_SEC, JWT_SEC } = require('../config')
const jwt = require("jsonwebtoken")

//Register

router.post("/register", async (req, res) => {
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJs.AES.encrypt(req.body.password, 
            PASS_SEC).toString(),
    });
    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(500).json("pot")
    }
})
//////////////////////////////////////////////////////////

// LOGIN

router.post("/login" , async (req,res,next) => {
    try {
        // const hashedPassword = CryptoJs.AES.decrypt(req.body.password, PASS_SEC)
        const user = await User.findOne({username : req.body.username});
        // console.log(user)
     !user && res.status(401).json("Wrong Credentials!")

//////////////////////////////////////////////////////////
        const hashedPassword = CryptoJs.AES.decrypt(user.password, PASS_SEC);
    //    console.log(hashedPassword)
        const origionalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
///////////////////////////////////////////////////////////      
        origionalPassword !== req.body.password && res.status(401).json("Wrong Credentials!")

        const accessToken = jwt.sign({id : user._id, isAdmin : user.isAdmin}, JWT_SEC, {expiresIn : "3d"})
        
        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken})

    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router