const jwt = require('jsonwebtoken');
require('dotenv').config();

//auth
exports.auth = async (req,res,next) => {
    try{
        // console.log("Request" ,req.body);
        const token = req.cookies.authToken;
        // console.log("Token : " , token);

        //if token is missing
        if(!token){
            return res.status(406).json({
                success:false,
                message:"Token is missing"
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            req.body.patient = decode;  
            // console.log("Verfied");
        } 
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        } 

        // console.log("after token");
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while validating the token'
        })
    }
}