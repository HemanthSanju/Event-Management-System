const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: String, required: true },
  date: { type: Date, required: true },
  booked_seats: { type: Number, required: true},
  total_price: { type: Number }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
