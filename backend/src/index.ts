import express from 'express';

const app = express;
const PORT = 3000;

const otpStore : Record<string,string> = {};

app.post('/generate-otp', (req,res) =>{
    const email = req.body.email;
    if(!email){
        return res.status(400).json({message: "Email is required"});
    }

    const otp  = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    console.log(`OTP for ${email}: ${otp}`);
    res.status(200).json({message: "OTP generated and logged"});
});
