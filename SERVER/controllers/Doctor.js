const Doctor = require('../models/Doctor');

exports.getAllDoctors = async(req, res) => {
    let doctorsList = await Doctor.find({});

    if(!doctorsList){
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }

    return res.json({
        success:true,
        doctorsList,
        message:"Successfully got the list pf doctors"
    })
}