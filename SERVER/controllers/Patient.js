const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

exports.applyDiscount = async(req,res) => {
    try{
        // console.log("Request" ,req.params);
        const {doctorId, patient} = req.body;
        const currDoctor = await Doctor.findById(doctorId).populate('appointments').exec();

        console.log(currDoctor);

        if(!currDoctor){
            return res.json({
                success:false,
                message:"Something went wrong inside apply discount"
            })
        }

        const hasVisited = currDoctor?.appointments?.some(p => p.patient.toString() === patient.id);

        if(hasVisited){
            return res.json({
                success:false,
                price:currDoctor.consultancyFees,
                message:"You have already visited the doctor"
            })
        }

        return res.json({
            success:true,
            price:0.8*currDoctor.consultancyFees,
            message:"Congratulations! You got discount."
    })} catch(error){
        return res.json({
            success:false,
            message:"Something goes wrong while applying discount"
        })
    }
}

exports.confirmAppointment = async(req,res) => {
    try {
        const {patient,doctorId, price, slot} = req.body;

        const doctor = await Doctor.findById(doctorId);
        const currPatient = await Patient.findById(patient.id);
        console.log("Reached here 2");

        if(!doctor || !currPatient || !price || !slot){
            return res.status(400).json({
                success:false,
                message:"missing entries"
            })
        }

        const newAppointment = await Appointment.create({
            doctor,
            patient:currPatient,
            appointmentDate: Date.now(),
            timeSlot: doctor.timeSlots[slot],
            fees:price
        })

        console.log("Booking timeslot :", doctor.timeSlots[slot]);

        doctor.timeSlots[slot].isBooked = true;
        doctor.markModified(`timeSlots.${slot}`);
        doctor.appointments.push(newAppointment._id);
        doctor.revenueGenerated += price;
        // doctor.discountOfferd += 1;
        await doctor.save();

        console.log("Reached here 3");

        currPatient.appointments.push(newAppointment._id);
        currPatient.walletBalance -= price;
        await currPatient.save();

        

        return res.status(200).json({
            patient:currPatient,
            success:true,
            message:"Appointment fixed successfully"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Somthing went wrong while booking appointment"
        })
    }
}

exports.allAppointments = async(req,res) => {
    try{
        const {patient} = req.body;
        console.log(patient)
        if(!patient){
            return res.json({
                success:false,
                message:"There is somthing missing"
            })
        }

        const currPatient = await Patient.findById(patient.id).populate({
            path: 'appointments',
            populate:{
                path: 'doctor'
            }
        }).exec();

        if(!currPatient){
            return res.json({
                success:false,
                message:"Patient not found"
            })
        }

        return res.status(200).json({
            success:true,
            appointments: currPatient.appointments,
            message:"Successfully fetched appointments"
        })
    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while getting appointments"
        })
    }
}