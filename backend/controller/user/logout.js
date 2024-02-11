const redisClient = require("../../db/redis");

const logout = (req,res)=>{
    try {
        redisClient.del(`"${req.sessionID}"`);
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
                res.status(500).json({message:'Internal Server Error'});
            }
            else{
                console.log("Logout success");
                res.json({message:'Logout Success'});
            }
        })
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = logout;