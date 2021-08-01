const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventId: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
});

const CalendarSchema = new Schema({
  calendarId: {
    type: Number,
    required: true,
  },
  ownerId: {
    type: Number,
    required: true,
  },
  events: {
    type: [EventSchema],
    required: true,
  }
});

module.exports = Calendar = mongoose.model('calendars', CalendarSchema);

