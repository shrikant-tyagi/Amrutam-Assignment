const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mail/templates/emailVerificationTemplate');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },

    otp:{
        type:String,
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 30
    }
})

async function sendVerificationEmail(email , otp) {
       try{
            const mailResponse = await mailSender(
                email, 
                "Verification Email", 
                emailTemplate(otp)
            );
        console.log("Verification Email send successfully :" , mailResponse.response);
       }
       catch(err){
          console.log("Error occured while sending verification email" , err);
          throw err;
       }
}

//pre-save hook to send email after the document has been saved
otpSchema.pre("save" , async function(next){

    console.log("New document saved to db");

    //only send the email when a new document is created
    if(this.isNew){
        console.log("Before email sending")
        await sendVerificationEmail(this.email , this.otp);
        console.log("After email has send")
    }
    next();
});

module.exports = mongoose.model("OTP" , otpSchema);