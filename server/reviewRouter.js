const router = require("express").Router();
const reviewControllers = require("./reviewController.js");
//Restaurant /Review Routes
router.get('/restaurants/:restaurant_id/reviews', reviewControllers.restaurant.readAll);
router.get('/restaurants/:restaurant_id/reviews/:id', reviewControllers.restaurant.readOne);

router.post('/restaurants', reviewControllers.restaurant.newRestaurant)
router.post('/restaurants/:restaurant_id/reviews', reviewControllers.restaurant.newReview)

router.put('/restaurants/:restaurant_id', reviewControllers.restaurant.updateName )
router.patch('/restaurants/:restaurant_id/reviews/:id', reviewControllers.restaurant.updateReview)

router.delete('/restaurants/:restaurant_id/reviews/:id', reviewControllers.restaurant.deleteReview)
router.delete('/restaurants/:restaurant_id', reviewControllers.restaurant.deleteRestaurant)

// //User Routes
// // router.get('/user', reviewControllers)
// router.get('/users/:user_id', reviewControllers.user.read);
// router.post('/users', reviewControllers.user.create);
// router.put('/users/:user_id', reviewControllers.user.update)
// router.delete('/users/:user_id', reviewControllers.user.delete)

module.exports = router;