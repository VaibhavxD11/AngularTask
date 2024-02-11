const verifyOtp = (req,res)=>{
    try {
        const {clientOtp} = req.body;
        const serverOtp = global.userOtp[0];
        console.log(req.cookies.email, "has initiated an otp request");
        if(clientOtp===serverOtp){
            console.log("OTP Verified");
        }
        res.json({message:"OTP Verified"});
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = verifyOtp;