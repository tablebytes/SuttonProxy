// require("newrelic");
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require("body-parser");
const request = require('request');
const redis = require('../redis/redis');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
// const reviewRouter = require("./reviewRouter.js");

const axios3002 = axios.create({baseURL: 'http://18.224.157.232/'})
// const axios3003 = axios.create({baseURL: 'http://35.165.224.178'})
const axios3004 = axios.create({baseURL: 'http://3.209.149.69:3004'});

app.use('/restaurants/:id', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended : true}));

app.get('/api/restaurants/:id/photos', (req, res) => {
  axios3002.get(`/api/restaurants/${req.params.id}/photos`)
    .then(response =>{
       res.send(response.data)
      })
    .catch(error => res.send(error));
 });


 app.get('/api/restaurants/:id/menus', (req, res) => {
  axios3004.get(`/api/restaurants/${req.params.id}/menus`)
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
 });
 app.get('/api/restaurants/:id/menus/:menu', (req, res) => {
  axios3004.get(`/api/restaurants/${req.params.id}/menus/${req.params.menu}`)
    .then(response => res.send(response.data))
    .catch(error => res.send(error));
 });

app.use('/api/reviews/', (req, res)=>{
  request(`http://13.56.50.90:3001/api/reviews${req.url}`, (err, response, body) =>{
    if(err){
      res.status(404)
      res.send(err);
    } else {
      res.send(JSON.parse(body));
    }
  })
});



app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
