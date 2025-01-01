const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        trim:true
    },

    password:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true
    },

    walletBalance:{
        type:Number,
    },

    appointments: [
        {
            type: mongoose.Types.ObjectId,
            ref:'Appointment'
        }
    ],
},
);

module.exports = mongoose.model("Patient" , patientSchema);