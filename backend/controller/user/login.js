const conn = require("../../db/connection");
const bcrypt = require("bcrypt");
const redisClient = require('../../db/redis');


const login = (req,res)=>{
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({message:'Bad Request'});
        }
        conn.query('select * from users where username=?',
        [username], (err,result)=>{
            if(err){
                console.log('Internal Server Error');
                res.status(500).json({message:'Internal Server Error'});
            }
            if(result.length>0){
                bcrypt.compare(password, result[0].password, (error,response)=>{
                    // if(error){
                    //     res.status(401).json({message:"Error"});
                    // }
                    if(response){
                        console.log('Successful login');
                        req.session.user = result;
                        // res.cookie('user2',req.session.user,{
                        //     maxAge:1000*60,
                        //     httpOnly:true
                        // })
                        const username = result[0].username;
                        redisClient.set(`"${req.sessionID}"`,`"${username}"`);
                        // console.log(result);
                        console.log(req.session.user);
                        res.json({result});
                    }
                    else{
                        console.log('Invalid Credentials');
                        res.status(401).json({message:'Invalid Credentials'});
                    }
                })
            }
            else{
                res.status(401).json({message:'User Not Found'});
            }
        }
        )
    } catch (error) {
        console.log(error);
    }
}

module.exports = login;