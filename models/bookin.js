const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new mongoose.Schema({
    clientName :{
        type : String,
    },
    service : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ['Scheduled', 'Completed', 'Canceled'],
        default: 'Scheduled',
        required : true,
    },
    time : {
        type : String,
        required : true,
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'     
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;