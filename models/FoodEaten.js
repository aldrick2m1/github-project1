const mongoose = require('mongoose');
// create user schema
const Schema = mongoose.Schema;

const foodeatenSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const FoodEaten = mongoose.model('FoodEaten', foodeatenSchema);

module.exports = FoodEaten;