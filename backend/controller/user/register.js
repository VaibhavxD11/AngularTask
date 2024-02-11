const conn = require("../../db/connection");
const bcrypt = require("bcrypt");
require('dotenv').config();

const salt = parseInt(process.env.salt,10);


const register =(req,res)=>{
    console.log(req.body);
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:'Internal Server Error'});
        }
        conn.query(
            'Select * from users where email=?',[email],
            (err,result)=>{
                if(err){
                    res.status(500).send('Internal Server Error');
                }
                if(result.length>0){
                    console.log(result);
                    res.status(401).json({message:'Email already exists'});
                }
                else{
                    console.log(salt);
                    bcrypt.hash(password, salt,(error,pass)=>{
                        if(error){
                            console.log(error);
                            console.log('Internal Server Error2');
                        }
                        else{
                            conn.query('insert into users (username,email,password) values (?,?,?)',
                            [username,email,pass], (err,result)=>{
                                if(err){
                                    console.log(username);
                                    console.log('Error registering the userr');
                                    res.status(500).json({message:'Internal Server Error'});
                                }
                                else{
                                    console.log(result);
                                    res.send(result);
                                }
                            }
                            )
                        }
                    })
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
}

module.exports = register;