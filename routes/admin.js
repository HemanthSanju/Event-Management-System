const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/homepage', adminController.homepage);

router.post('/create-event', requireAdmin, adminController.createEvent);

// router.put('/reschedule-event', adminController.rescheduleEvent);

router.delete('/cancel/:eventId', adminController.cancelEvent);


module.exports = router;