const conn = require("../../db/connection");

const deleteTask = (req,res)=>{

    try {
        const task_id = req.params.id;
        const user_id = req.session.user[0]['user_id'];

        if(!task_id || !user_id){
            return res.status(400).json({message:'Bad Request'});
        }
    
        conn.query('update task set show_task="false" where task_id=? and user_id=?', [task_id, user_id],
        (err,result)=>{
            if(err){
                console.log(err);
                res.status(500).json({message:"Internal Server"});
            }
            if(result.affectedRows>0){
                console.log(result);
                res.json({message:"Delete Done"});
            }
            else{
                res.json({message:"Task doesnt exist"});
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal Server Error'})
    }
}

module.exports = deleteTask;