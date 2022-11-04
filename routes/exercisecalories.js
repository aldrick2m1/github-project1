
const router = require('express').Router();
let ExerciseCalories = require('../models/ExerCalories');

router.route('/:activity').get((req, res) => {
  ExerciseCalories.find({activity: req.params.activity})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add-activity').post((req, res) => {
  const activity = req.body.activity;
  const unit = req.body.unit;
  const calorie = Number(req.body.calorie);


  const newExerCalories = new ExerciseCalories({
    activity,
    unit,
    calorie
  });

  newExerCalories.save()
  .then(() => res.json('ExerCalories added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

