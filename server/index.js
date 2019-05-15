require("newrelic");
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require("body-parser");
const request = require('request');
const redis = require('../redis/redis');
const app = express();
const port = process.env.PORT || 3000;
// const reviewRouter = require("./reviewRouter.js");

// const axios3002 = axios.create({baseURL: 'http://18.188.49.19'})
// const axios3003 = axios.create({baseURL: 'http://35.165.224.178'})
// const axios3004 = axios.create({baseURL: 'http://34.219.173.69'})

app.use('/restaurants/:id', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended : true}));

// app.use('/api/restaurants/', (req, res)=>{
//   request(`http://18.224.157.232/api/restaurants/${req.url}`, (err, response, body) =>{
//     if(err){
//       res.status(404)
//       res.send(err);
//     } else {
//       res.send(JSON.parse(body));
//     }
//   })
// });


app.use('/api/reviews/', (req, res)=>{
  console.log(req.url.split('/').length);
  var splitURL= req.url.split('/');
  var restaurant_id = parseInt(splitURL[2])
  if(req.method === 'GET' && splitURL.length === 4 && splitURL[1] === 'restaurants' && splitURL[3] === 'reviews'){
    redis.get( restaurant_id , (err, result)=>{
      if(err){
        console.log('Err',err);
        res.status(404);
        res.send(err);
      } else if (result){
        // console.log("redis")
        res.send(JSON.parse(result));
      } else {
        request(`http://13.56.50.90:3001/api/reviews${req.url}`, (err, response, body) =>{
          if(err){
            res.status(404)
            res.send(err);
          } else {
            if(restaurant_id < 100000){
              redis.set(restaurant_id, JSON.stringify(body));
            }
            // console.log("DB")
            res.send(JSON.parse(body));
          }
        })
      }
    })
  } else {
    request(`http://13.56.50.90:3001/api/reviews${req.url}`, (err, response, body) =>{
    if(err){
      res.status(404)
      res.send(err);
    } else {
      res.send(JSON.parse(body));
    }
  })
  }
  
});




// app.get('/api/restaurants/:id/photos', (req, res) => {
//   axios3002.get(`api/restaurants/${req.params.id}/photos`)
//     .then((response) => {
//       res.send(response.data);
//     })
//     .catch((err) => {
//       res.send(err);
//     })
// });

// app.get('/api/restaurants/:id/info', (req, res) => {
//   axios3003.get(`api/restaurants/${req.params.id}/info`)
//     .then((response) => {
//       res.send(response.data);
//     })
//     .catch((err) => {
//       res.send(err);
//     })
// });

// app.get('/api/restaurants/:id/overview', (req, res) => {
//   axios3003.get(`api/restaurants/${req.params.id}/overview`)
//     .then((response) => {
//       res.send(response.data);
//     })
//     .catch((err) => {
//       res.send(err);
//     })
// });

// app.get('/api/restaurants/:id/menus', (req, res) => {
//   axios3004.get(`api/restaurants/${req.params.id}/menus`)
//     .then((response) => {
//       res.send(response.data);
//     })
//     .catch((err) => {
//       res.send(err);
//     })
// });

// app.get('/api/restaurants/:id/menus/:menu', (req, res) => {
//   axios3004.get(`api/restaurants/${req.params.id}/menus/${req.params.menu}`)
//     .then((response) => {
//       res.send(response.data);
//     })
//     .catch((err) => {
//       res.send(err);
//     })
// });

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
