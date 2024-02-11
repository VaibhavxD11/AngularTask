const express = require('express');
const app = express();
const db = require('./db/connection');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const redisClient = require('./db/redis'); 
const redis = require('redis');
const connectRedis = require('connect-redis').default;
require('dotenv').config();


app.use(express.json());

const RedisStore = connectRedis; 
// const redisClient = redis.createClient({
//     port: 6379,
//     host:'localhost'
// }); 
  
// (async () => { 
//     await redisClient.connect();
// })(); 
  
// console.log("Connecting to the Redis"); 
  
// redisClient.on("connect", () => { 
//     console.log("Connected to Redis!"); 
// }); 
  
// redisClient.on("error", (err) => { 
//     console.log("Error in the Connection"); 
// }); 



// redisClient.set('key','value');

app.use(cors({
    origin:["http://localhost:4200"],
    methods:["GET","POST","PUT","DELETE"],
    credentials: true
}));


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    key:"user_id",
    secret: process.env.secret,
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires: 1000*60*20,
        httpOnly:false
    },
    store: new RedisStore({client:redisClient}),
}
))

app.use(require('./routes/clientRoutes'));

app.listen(3000, ()=>{
    console.log('The app is listening on port 3000');
})

app.get('/',(req,res)=>{
    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id);
    res.send("Hello");
})
