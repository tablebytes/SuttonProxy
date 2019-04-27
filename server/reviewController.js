const axios = require('axios');
const axios3001 = axios.create({baseURL: 'http://localhost:3001/'})

module.exports = {
  restaurant : {
    readAll : (req, res)=>{
      axios3001.get(`api/reviews/restaurants/${req.params.restaurant_id}/reviews`)
        .then((response) => {
          res.send(response.data);
        })
        .catch((err) => {
          res.send(err);
        })
    },
    readOne : (req , res) => {
      axios3001.get(`api/reviews/restaurants/${req.params.restaurant_id}/reviews/${req.params.id}`)
        .then((response) => {
          res.send(response.data);
        })
        .catch((err) => {
          res.send(err);
        })
    },
    newRestaurant : (req, res) => {
      axios3001.post(`api/reviews/restaurants`,{
        name : JSON.stringify(req.body.name)
      })
      .then((response) => {
        res.send(JSON.stringify(response.data));
      })
      .catch((err) => {
        res.send(err);
      })
    },
    newReview : (req, res) => {
      axios3001.post(`api/reviews/restaurants/${req.params.restaurant_id}/reviews`,req.body)
      .then((response) => {
        res.send(JSON.stringify(response.data));
      })
      .catch((err) => {
        res.send(err);
      })
    },
    updateName : (req, res) => {
      axios3001.put(`api/reviews/restaurants/${req.params.restaurant_id}`, req.body)
        .then((response) => {
          res.send(JSON.stringify(response.data));
        })
        .catch((err) => {
          res.send(err);
        })
    },
    updateReview : (req, res) => {
      axios3001.patch(`api/reviews/restaurants/${req.params.restaurant_id}/reviews/${req.params.id}`, req.body)
        .then((response) => {
          res.send(JSON.stringify(response.data));
        })
        .catch((err) => {
          res.send(err);
        })
    },
    deleteReview : (req, res) =>{
      axios3001.delete(`api/reviews/restaurants/${req.params.restaurant_id}/reviews/${req.params.id}`)
        .then((response) => {
          res.send(JSON.stringify(response.data));
        })
        .catch((err) => {
          res.send(err);
        })
    },
    deleteRestaurant : (req, res) => {
      axios3001.delete(`api/reviews/restaurants/${req.params.restaurant_id}`)
        .then((response) => {
          res.send(JSON.stringify(response.data));
        })
        .catch((err) => {
          res.send(err);
        })
    }
  },
  // user : {
  //   //Gets all reviews from 1 user and adds user information on end
  //   read : (req, res)=> {
  //     Models.Review.findAll({ where: { user_id : req.params.user_id }})
  //       .then((data) => {
  //         Models.User.findOne({where: { id: user_id} })
  //           .then((userData) => {
  //             data.push(userData);
  //             res.send(data);
  //           })
  //         .catch(err => console.log(err));
  //       })
  //       .catch(err => console.log(err));
  //   },
  //   create : (req, res) => {
  //     Models.User.create({
  //       username : req.body.username,
  //       review_count : 0,
  //       location : req.body.location,
  //       VIP: 0
  //     })
  //       .then((result)=>{
  //         res.send(JSON.stringify(result.id));
  //       })
  //       .catch(err => console.log(err));
  //   },
  //   update : (req, res)=>{
  //     Models.User.update(
  //       {username : req.body.username} ,{where: { id : req.params.user_id }})
  //       .then(() => {
  //         res.send("User Updated");
  //       })
  //       .catch(err => console.log(err));
  //   },
  //   delete : (req, res) =>{
  //     Models.User.destroy({ where: { id: req.params.user_id}})
  //       .then(()=>{
  //         res.send("User deleted");
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }
}
