import express from 'express';
import rateLimit from 'express-rate-limit';
const app = express;
const PORT = 3000;

app.use(express.json());

// Rate Limiter configuration
const otpLimiter = rateLimit({
    windowMs:5*60*1000,
    max:3,
    message:'Too many requests, please try again after 5 minutes',
    standardHeaders:true,
    legacyHeaders:false,
});

const passwordResetLimiter = rateLimit({
    windowMs:15*60*1000,
    max:5,
    message:'Too many password reset attempts, please try again after 15 minutes',
    standardHeaders:true,
    legacyHeaders:false,
})

const otpStore : Record<string,string> = {};

// Endpoint to generate and log OTP
app.post('/generate-otp', (req,res) =>{
    const email = req.body.email;
    if(!email){
        return res.status(400).json({message: "Email is required"});
    }

    const otp  = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    // should send an email here
    console.log(`OTP for ${email}: ${otp}`);
    res.status(200).json({message: "OTP generated and logged"});
});


// Endpoint to reset password
app.post('/reset-password',(req,res)=>{
    const  {email,otp, newPassword} =  req.body;
    if(!email || !otp || !newPassword){
        return res.status(400).json({message: "Email OTP, and new password are required"});
    }
    if(otpStore[email] === otp){
        console.log(`Password for ${email} has been reset to: ${newPassword}`);
        delete otpStore[email]; // Clear the OTP after use 
        return res. status(200).json({message:"Password has been reset successfully"});
    }else{
        res.status(401).json({message:"Invalid OTP"});
    }
}); 

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});