const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  senderId: {
    type: Number,
    required: true;
  },
  receiverId: {
    type: Number,
    required: true;
  },
  message: {
    type: String,
    required: true,
  },
  msgStatus: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ChatSchema = new Schema({
  sessionId: {
    type: Number,
    required: true;
  },
  patientId: {
    type: Number,
    required: true;
  },
  clinicianId: {
    type: Number,
    required: true;
  },
  messages: {
    type: [MessageSchema],
    default: undefined,
    required: true,
  },
});

module.exports = Chat = mongoose.model('chat', ChatSchema);
