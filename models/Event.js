const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  start_time: { type: String, required: true },
  imgLink: { type: String, required: true },
  rating: { type: Number, required: true },
  genre: { type: String, required: true },
  capacity: { type: Number, required: true },
  // seats: { type: Number, default: 0 },
  price: { type: Number, required: true}
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
