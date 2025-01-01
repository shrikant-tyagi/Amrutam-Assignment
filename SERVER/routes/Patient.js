const express = require('express');
const router = express.Router();

const {applyDiscount, confirmAppointment, allAppointments} = require('../controllers/Patient');
const {auth} = require('../middlewares/auth');

router.post('/applyDiscount', auth, applyDiscount);
router.post('/confirmBooking', auth, confirmAppointment);
router.get('/getAppointments',auth, allAppointments);

module.exports = router;