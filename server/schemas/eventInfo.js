const mongoose = require('mongoose'); 

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  seats: {
    type: Number,
    required: true,
  },
  seatsRemaining: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Event', EventSchema);