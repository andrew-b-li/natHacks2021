const mongoose = require('mongoose');
const Schema - mongoose.Schema;

const EventSchema = new Schema({
  eventId: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    default: undefined, // Need to set start date before event is legitimate
    required: true,
  },
  endDate: {
    type: Date,
    default: undefined, // Need to set end date
    required: true,
  },
  title: {
    type: String,
    default: undefined,
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
    default: undefined,
  }
});

module.exports = Calendar = mongoose.model('calendars', CalendarSchema);


