const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    title: String,
    location: String,
    coordinates: {
        type: [Number],
        required: true
      },
    date: Date,
    }, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);