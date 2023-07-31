const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.post('/book-ticket', publicController.bookTicket);

router.get('/movies', publicController.findAllMovies);

router.get('/movies/:eventId', publicController.findOne);

// router.delete('/cancel-ticket/:ticketId', publicController.cancelTicket);

module.exports = router;