const nodemailer = require('nodemailer');


const forgotPassword  = (req,res) =>{
    global.userEmail = req.body.email;
    console.log("Email:",userEmail);
    res.cookie('email', userEmail, {
        expires: new Date(Date.now() + 1000*60*10),
        httpOnly: true,
      });

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: "vaibhavdwivedi.2211@gmail.com",
            pass: "nphq irsj gocp ruxt",
        },
    });

    const sendOtp = (email,otp)=>{
        const mailOptions={
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Forgot Password OTP',
            text: `Your OTP for password reset is: ${otp}`,
        }

        transporter.sendMail(mailOptions,(err, info)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("Email Sent:",info.response);
                res.status(200).json({message:"OTP sent"});
            }
        } )
    }

    const generatedOtp=()=>{
        let otp = Math.floor(Math.random() * Math.pow(10,4));
        return otp;
    }

    const finalOtp = generatedOtp();
    console.log(finalOtp);
    global.userOtp = [];
    userOtp.push(finalOtp);

    sendOtp(userEmail,finalOtp);

}

module.exports = forgotPassword;