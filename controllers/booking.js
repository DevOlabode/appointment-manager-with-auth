const Booking  = require('../models/bookin');
const ExpressError = require('../utils/expressError');
const status = ['Scheduled', 'Completed', 'Canceled'];

module.exports.appointmentList = async (req, res)=>{
    const bookings = await Booking.find({ user : req.user._id });
    const count = await Booking.countDocuments( {user : req.user._id} );
    res.render('appointment/index', { bookings, count })
};

module.exports.newAppointmentForm = (req, res)=>{
    res.render('appointment/new', { status })
};

module.exports.newAppointment = async(req, res)=>{
    const madeAppointment = req.body;
    if(!madeAppointment){
        throw new ExpressError('New Appointment Was Unable TO Be Made', 400)
    }
    const newAppointment = new Booking(madeAppointment);
    newAppointment.user = req.user._id;
    await newAppointment.save();
    req.flash('success', 'Successfully made a new appointment.')
    res.redirect(`/booking/${newAppointment._id}`);
};

module.exports.showPage = async (req, res)=>{
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('user');
    if(!booking){
        throw new ExpressError('Campground Not Found', 404)
    }
    res.render('appointment/details', { booking });
};

module.exports.editForm = async(req, res)=>{
    const { id } = req.params;
    const appointment = await Booking.findById(id);
    res.render('appointment/edit', {appointment, status })
};

module.exports.editAppointment = async(req, res)=>{
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body,  { runValidators: true, new : true });
    req.flash('success', 'Successfully edited an appointment')
    res.redirect(`/booking/${updatedBooking._id}`);  
};

module.exports.deleteAppointment = async(req, res)=>{
    const { id } = req.params;
    const deleted = await Booking.findByIdAndDelete(id);
    req.flash('success', `Successfully deleted the ${deleted.clientName} appointment.`)
    res.redirect('/booking');
};