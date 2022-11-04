const mongoose = require('mongoose');
// create exercises schema
const Schema = mongoose.Schema;

const exerCaloriesSchema = new Schema({
  activity: { type: String},
  unit: { type: String },
  calorie: { type: Number },
});

const ExerCalories = mongoose.model('ExerCalories', exerCaloriesSchema);

module.exports = ExerCalories;