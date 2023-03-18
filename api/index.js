const express = require('express')
const {APP_PORT, MONGO_URL} = require('./config')

const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
// const cartRoute = require('./routes/cart');
const productRoute = require('./routes/product');
const stripeRoute = require('./routes/stripe');

const cors = require("cors")

mongoose.connect(MONGO_URL)
.then(() => console.log("DB Connected"))
.catch((err) => {
    console.log(err)
});


app.use(cors());

app.use(express.json());

app.use("/api/auth" , authRoute);
app.use("/api/users" , userRoute);
app.use("/api/products" , productRoute);
// app.use("/api/carts" , cartRoute);
app.use("/api/orders" , orderRoute);
app.use("/api/checkout" , stripeRoute);



app.listen(APP_PORT || 5000, () => {
    console.log("Backend server is running")
});