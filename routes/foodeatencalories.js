const router = require('express').Router();
let FoodEatenCalories = require('../models/FeaCalories');

router.route('/:food').get((req, res) => {
  FoodEatenCalories.find({food: req.params.food})
    .then(foodeaten => res.json(foodeaten))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add-food').post((req, res) => {
  const food = req.body.food;
  const unit = req.body.unit;
  const calorie = Number(req.body.calorie);


  const newFeaCalories = new FoodEatenCalories({
    food,
    unit,
    calorie
  });

  newFeaCalories.save()
  .then(() => res.json('FeaCalories added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;