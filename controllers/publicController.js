const Event = require('../models/Event');
const Ticket = require('../models/Ticket');

exports.findAllMovies = async (req, res) => {
    Event.find({})
    .then(data => res.status(200).json({
        status: 'OK',
        message: 'List of movies retrieved successfully',
        data: [data]
    }))
      .catch(err => res.status(500).send({ message: "Some Error Occured while fetching Event" }));
}

exports.findOne = async (req, res) => {
    const movieId = req.params.eventId;
    Event.findById(movieId)
    .then(data => res.send(data))
      .catch(err => res.status(500).send({ message: "Some Error Occured while fetching Event" }));
}

exports.bookTicket = async (req, res) => {
  try {
    const { event_id, user, date, booked_seat } = req.body;
    const event = await Event.findOne({_id: event_id});
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    if (event.capacity - event.seats > 0) {
      const ticket = await Ticket.create({
        event: event._id,
        user: user,
        date: date,
        booked_seats: booked_seat,
        total_price: event.price*booked_seat
      });
      event.seats += booked_seat;
      await event.save();
      res.status(201).json({
        status: 'Created',
        message: 'Ticket booked successfully',
        data: [ticket]
      });
    } else {
      res.status(403).json({ error: 'Event is full' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// exports.cancelTicket = async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.ticketId);
//     if (!ticket) {
//       return res.status(404).json({ error: 'Ticket not found' });
//     }
//     const event = await Event.findById(ticket.event);
//     event.capacity += 1;
//     await event.save();
//     await ticket.deleteOne();
//     res.json({
//       status: 'OK',
//       message: 'Ticket cancelled successfully',
//       data: [null]
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
