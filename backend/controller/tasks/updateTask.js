const e = require("express");
const conn = require("../../db/connection");

const updateTask = (req,res)=>{

    try {
        const {title,task_desc,due_date} = req.body;
        if(!title || !task_desc || !due_date){
            return res.status(400).json({message:'Bad Request'});
        }
        console.log(res.body);
        const task_id = req.params.id;
        const user_id = req.session.user[0]['user_id'];
        conn.query('update task set title=?, task_desc=?, due_date=? where task_id=? and user_id',
        [title,task_desc,due_date,task_id,user_id], (err,result)=>{
            if(err){
                console.log(err);
                res.json({message:'Internal Server Error'});
            }
            else{
                console.log(result);
                res.json({result});
            }
        })
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'});
    }

}

module.exports = updateTask;