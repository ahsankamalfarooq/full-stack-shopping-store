const router = require("express").Router();

const stripe = require("stripe")(STRIPE_KEY);




router.post("/payment" , (req,res,next) => {
    stripe.charges.create({
        source : req.body.tokenId,
        amount : req.body.amount,
        currency : "usd",
    }, (stripeErr , stripeRes) => {
        if(stripeErr) {
            res.status(700).json("stripeErr")
        }
        else{
            res.status(200).json(stripeRes)
        }
    });
})







module.exports = router;