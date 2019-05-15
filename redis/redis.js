const redis = require('redis');
const redisClient = redis.createClient('6379', '127.0.0.1');
const redisinfo = require('../redAu.js')


redisClient.auth(redisinfo.redispswd);

redisClient.on('connect', async()=>{
  // await warmRedis();
  console.log("Redis Connected");
});

redisClient.on('err', (err)=>{
  console.log("Redis err", err)
});


module.exports=redisClient;