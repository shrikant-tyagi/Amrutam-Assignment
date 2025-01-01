const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
    startTime: { type: String, 
                 required: true },

    endTime: { type: String, 
               required: true },

    isBooked: { type: Boolean, 
                default: false },
  });
  
  // Define the schema for an Appointment
  const appointmentSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, 
                ref: 'Doctor', required: true },

    patient: { type: mongoose.Schema.Types.ObjectId,
               ref: 'Patient', required: true },

    appointmentDate: { type: Date, 
                       required: true },

    timeSlot: timeSlotSchema,

    fees:{
      type:Number,
      required:true
    },

    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
  },{timestamps:true});

  module.exports = mongoose.model('Appointment', appointmentSchema);