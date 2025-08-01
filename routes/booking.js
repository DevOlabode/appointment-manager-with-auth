const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const { isLoggedIn,validateAppointment } = require('../middleware');
const booking = require('../controllers/booking');

router.route('/')
    .get(isLoggedIn, catchAsync(booking.appointmentList))
    .post(isLoggedIn, validateAppointment, catchAsync(booking.newAppointment))


router.get('/new', isLoggedIn, booking.newAppointmentForm);

router.route('/:id')
    .get( catchAsync(booking.showPage))
    .put(validateAppointment, catchAsync(booking.editAppointment))
    .delete(isLoggedIn, catchAsync(booking.deleteAppointment))

router.get('/:id/edit', isLoggedIn,  catchAsync(booking.editForm));

module.exports = router;