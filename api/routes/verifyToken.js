const jwt = require('jsonwebtoken')
const {JWT_SEC} = require('../config')




const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token
 
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        // console.log(token)
        jwt.verify(token, JWT_SEC, (err, user) => {
            // console.log(user)
            if (err) res.status(403).json("Token Is Not Valid")

            // console.log(user)
                req.user = user
                // console.log(user)
                next();
        });
    } else {
        return res.status(401).json("Authentication Failed")
    }
};


const verifyTokenAndAuthorization = (req,res,next) => {

    verifyToken (req,res,() => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not allowed to do")
        }
    })
}



const verifyTokenAndAdmin = (req,res,next) => {

    verifyToken (req,res,() => {
    if(req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not allowed to do")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};