const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'password',
    database:'todoApp'
})

conn.connect((error)=>{
    if(error){
        console.log("Error occured:",error);
    }
    else{
        console.log("Connected to SQL Database");
    }
})

module.exports = conn;


// const {createPool} = require("mysql");


//     const pool = createPool({
//         host:"localhost",
//         user:"root",
//         password:"password",
//         database:"todoApp",
//         connectionLimit:10
//     })
    
//     pool.getConnection((err,conn)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log('Connected to SQL Database');
//             conn.release();
//         }
//     });

// module.exports = pool;