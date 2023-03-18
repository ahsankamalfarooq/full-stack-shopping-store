const dotenv = require("dotenv")

dotenv.config();




module.exports = {
    MONGO_URL,
    APP_PORT,
    PASS_SEC,
    JWT_SEC,
    STRIPE_KEY
} = process.env