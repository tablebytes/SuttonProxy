require("newrelic");
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const reviewRouter = require("./reviewRouter.js");

// const axios3002 = axios.create({baseURL: 'http://18.188.49.19'})
// const axios3003 = axios.create({baseURL: 'http://35.165.224.178'})
// const axios3004 = axios.create({baseURL: 'http://34.219.173.69'})

app.use(morgan('dev'));
app.use('/restaurants/:id', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended : true}));

app.use('/api/reviews/', reviewRouter);




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
