
const router = require('express').Router();
let Exercise = require('../models/Exercise');
// 1st endpoint
// gets all the exercises from mongodb database
router.route('/all-exercises/:username').get((req, res) => {
  Exercise.find({username: req.params.username})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
// 2n endpoint
// POST method
// create a new exercise
router.route('/add-exercise').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const calories = Number(req.body.calories);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    calories,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
// find a specific exercise by id
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/all-exercises/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});
// delete a specific user by a specific id
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
// edit a specific exercise by id 
router.route('/update-exercise/:id').put((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.calories = Number(req.body.calories);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
// get all the exercise log by a sppecific user
router.route('/summary/:username').get((req, res) => {
  Exercise.find({username: req.params.username})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;