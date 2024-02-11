const conn = require("../../db/connection");

const addTask=(req,res)=>{
    try {
        const {title,task_desc,due_date} = req.body;
        if(!title || !task_desc || !due_date){
            return res.status(400).json({message:'Bad Request'});
        }
        console.log(req.session.user[0]['user_id']);
        const user_id = req.session.user[0]['user_id'];
        conn.query('insert into task (title, task_desc,user_id,due_date) values (?,?,?,?)',
        [title, task_desc,user_id,due_date],(err,result)=>{
            if(err){
                console.log(err);
                res.status(500).json({message:'Internal Server Error'});
            }
            else{
                console.log(result);
                res.json({result});
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal Server Error'});
    }
}

module.exports = addTask;