const conn = require("../../db/connection");

const getUser = async (req,res)=>{
    const username = req.username;
    console.log(req.username);
    await conn.query(`Select * from users where username=${username}`,(error,result)=>{

        if(error){
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
        else{
            // console.log(req.session);
            console.log(result)
            res.json(result);
        }
    })
}

module.exports = getUser;