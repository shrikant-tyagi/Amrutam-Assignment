const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect('mongodb+srv://shrikant88852:I1kHl6nyrX2Wc5pE@cluster0.5al3qca.mongodb.net/Amrutam',{})
    .then(() => {console.log("Connected to database Successfully")})
    .catch((err) => {
        console.error(err);
        console.log("Error while connecting to Database");
        process.exit(1);
    })
}

module.exports = dbConnect;