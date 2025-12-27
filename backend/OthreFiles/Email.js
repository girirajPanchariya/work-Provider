import nodemailer from 'nodemailer'

export const genretOtp = ()=> Math.floor(1000 + Math.random()* 9000).toString()

export const otpStore = new Map()

export const sendOtp = async(email,otp)=>{
    try {
        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{
                 user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        await transport.sendMail({
            from:process.env.EMAIL_USER,
            to:email,
            subject:`Yout OTP Verificaton Code`,
            text:`your otp is ${otp}`
        })
        console.log(`otp is send to ${email}`);
        
    } catch (error) {
        console.log(error);
        
    }
}