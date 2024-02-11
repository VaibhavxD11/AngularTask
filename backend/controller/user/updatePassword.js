const conn = require("../../db/connection");
const bcrypt = require("bcrypt");
require('dotenv').config();
const salt = parseInt(process.env.salt,10);


const updatePassword = (req,res)=>{
    const password = req.body.password;
    console.log(global.userEmail);
    const userEmail = req.cookies.email;

    conn.query('Select * from users where email=?',[userEmail],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            bcrypt.hash(password,salt,(error,pass)=>{
                if(error){
                    console.log(error);
                }
                else{
                    conn.query('update users set password=? where email=?',[pass,global.userEmail],
                    (error,response)=>{
                        if(error){
                            console.log(error);
                        }
                        else{
                            console.log(response);
                            res.status(200).json({message:"Update success"});
                        }
                    })
                }
            })
        }
    })

}

module.exports = updatePassword;