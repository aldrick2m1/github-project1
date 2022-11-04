const router = require('express').Router();
let FoodEaten = require('../models/FoodEaten');
// get all food eaten
router.route('/all-foodeaten/:username').get((req, res) => {
  FoodEaten.find({username: req.params.username})
    .then(foodeatens => res.json(foodeatens))
    .catch(err => res.status(400).json('Error: ' + err));
});
// add new food log
router.route('/add-foodeaten').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const calories = Number(req.body.calories);
  const date = Date.parse(req.body.date);

  const newFoodEaten = new FoodEaten({
    username,
    description,
    calories,
    date,
  });

  newFoodEaten.save()
  .then(() => res.json('FoodEaten added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
// get a specific food log by id
router.route('/:id').get((req, res) => {
  FoodEaten.findById(req.params.id)
    .then(foodeaten => res.json(foodeaten))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/all-foodeaten/:id').get((req, res) => {
  FoodEaten.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});
// delete a foodlog by id
router.route('/:id').delete((req, res) => {
  FoodEaten.findByIdAndDelete(req.params.id)
    .then(() => res.json('FoodEaten deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
// edit a specific food log
router.route('/update-foodeaten/:id').put((req, res) => {
  FoodEaten.findById(req.params.id)
    .then(foodeaten => {
      foodeaten.username = req.body.username;
      foodeaten.description = req.body.description;
      foodeaten.calories = Number(req.body.calories);
      foodeaten.date = Date.parse(req.body.date);

      foodeaten.save()
        .then(() => res.json('FoodEaten updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
// get all the food log by a specific user
router.route('/summary/:username').get((req, res) => {
  FoodEaten.find({username: req.params.username})
    .then(foodeaten => res.json(foodeaten))
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;