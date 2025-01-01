const Patient = require('../models/Patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

 
//signUp controller
exports.signUp = async(req , res) => {
    try{
        // data fetch from request body
        const {
            fullName,
            age,
            email,
            password,
            confirmPassword,
        } = req.body;

        
        //validate karna hai
        if(!fullName || !email || !age || !password || !confirmPassword) {
            console.log("Not enterd all values");
            return res.status(403).json({
                success:false,
                message:"Enter value in each field"
            });
        }

        //check user already exist or not
        const existingPatient = await Patient.findOne({email});
        if(existingPatient){
            return res.json({
                success:false,
                message:"User already exist"
            })
        }

        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Enter password again!!!"
            })
        }

        //Hashing password
        const hashedPassword = await bcrypt.hash(password , 10);

        //create entry in db
        const user = await Patient.create({
            fullName , email, age,
            password:hashedPassword,
            walletBalance: 2000,
        })

        return res.status(200).json({
            success:true,
            message:"User registered successfully",
            user
        })
    }
    catch(err){
        res.json({
            success:false,
            message:"Unable to register user"
        })
    }
};

//login controller
exports.login = async (req,res) => {
    try{
       //get data fon req body
       const {email , password} = req.body;

       //validate data
       if(!email || !password){
        return res.json({
            success:false,
            message:"Enter all entries"
        })
       }

       //user check exist or not
       const patient = await Patient.findOne({email});
       if(!patient){
        return res.json({
            success:false,
            message:"not"
        })
       }
       let token;
       //generate JWT , after password matching
       if(bcrypt.compare(password , patient.password)){
            const payload = {
                email: patient.email,
                id: patient._id,
            } 

            token = jwt.sign(payload , process.env.JWT_SECRET , {
                expiresIn:'2h'
            })
            patient.password = undefined;
        }

        else{
            return res.json({
                success:false,
                message:"Password is Incorrect"
            })
        }

        // console.log("Reached here 1");
        res.cookie('authToken', token , {
            httpOnly: true, // Cookie is not accessible via JavaScript
            secure: true, // Cookie is only sent over HTTPS (in production)
            sameSite: 'Strict', // Helps prevent CSRF attacks
          });
        return res.json({
            success:true,
            patient,
            message:"User logged In successfully"
        })
       
    }
    catch(error) {
        console.log(error.messsage);
        return res.status(500).json({
            success:false,
            message:'Unable to login'
        })
    }
};