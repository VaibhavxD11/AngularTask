const conn = require("../../db/connection");

const getTasks=(req,res)=>{

    try {
        const user_id = req.session.user[0]['user_id'];
        if(!user_id){
            return res.status(400).json({message:'Bad Request'});
        }
        conn.query('Select * from task where user_id=? and show_task="true"',[user_id],(err,result)=>{
            if(err){
                console.log(err);
                res.status(500).json({message:'Internal Server Error'});
            }
            else{
                res.json({result});
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

module.exports = getTasks;