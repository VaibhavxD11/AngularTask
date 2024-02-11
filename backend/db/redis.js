const redis = require("redis"); 
const redisClient = redis.createClient({
    port: 6379,
    host:'localhost'
}); 
  
(async () => { 
    await redisClient.connect(); 
})(); 
  
console.log("Connecting to the Redis"); 
  
redisClient.on("connect", () => { 
    console.log("Connected to Redis!"); 
}); 
  
redisClient.on("error", (err) => { 
    console.log("Error in the Connection"); 
}); 

module.exports = redisClient;


