const mongoose = require('mongoose');
// create exercises schema
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;