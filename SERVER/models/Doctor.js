const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
    startTime: { type: String, 
                 required: true },

    endTime: { type: String, 
               required: true },

    isBooked: { type: Boolean, 
                default: false },
  });

const doctorSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        retuired:true,
    },

    consultancyFees:{
        type:Number,
        required:true
    },

    qualifications:{
        type:String,
        retuired:true,
    },

    timeSlots: [timeSlotSchema],

    appointments:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Appointment'
        }
    ],

    revenueGenerated:{
        type:Number
    },

    discountOfferd:{
        type:Number
    }
});

module.exports = mongoose.model("Doctor", doctorSchema);