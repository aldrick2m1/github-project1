const mongoose = require('mongoose');
// create exercises schema
const Schema = mongoose.Schema;

const feaCaloriesSchema = new Schema({
  food: { type: String},
  unit: { type: String },
  calorie: { type: Number },
});

const FeaCalories = mongoose.model('FeaCalories', feaCaloriesSchema);

module.exports = FeaCalories;