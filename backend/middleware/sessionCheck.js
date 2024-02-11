const express = require('express');
const app = express();
const session = require('express-session');
const redisClient = require('../db/redis');

const isAuth = async (req,res,next)=>{
    try {
        if(req.cookies && req.sessionID){
            const value = await redisClient.get(`"${req.sessionID}"`);
            console.log("Value---->",value);
            if(value!==null){
                console.log("SessionID-",req.sessionID);
                console.log(req.cookies.user_id);
                console.log("Secure Auth");
                req.username = value;
                next();
            }
            else{
                const err = new Error('Please Login again');
                err.statusCode = 401;
                res.status(401).json({message:"unauthorized"});
                throw err;
            }
        }
        else{
            const err = new Error('You are not authorised');
            err.statusCode = 401;
            res.status(401).json({message:"unauthorized"});
            throw err;
        }
        
    } catch (error) {
        console.error("Redis Error");
        next(error);
    }
}


module.exports = isAuth;