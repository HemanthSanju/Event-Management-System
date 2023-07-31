const Event = require('../models/Event');

exports.homepage = async (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Admin Homepage'
  });
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({
        status: 'Created',
        message: 'Event added successfully',
        data: [event]
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


exports.cancelEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await event.deleteOne();
    res.json({
      status: 'OK',
      message: 'Event cancelled successfully',
      data: [null]
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// exports.rescheduleEvent = async (req, res) => {
//   try {
//     const { eventId, newStartTime } = req.body;
//     const event = await Event.findById(eventId);
      
//     if (!event) {
//       return res.status(404).json({ error: 'Event not found' });
//     }
  
//     event.startTime = newStartTime;
//     await event.save();
  
//     res.json({
//       status: 'OK',
//       message: 'Event rescheduled successfully',
//       data: [event]
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };