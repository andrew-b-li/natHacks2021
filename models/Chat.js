const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  senderId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
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
    type: Schema.ObjectId,
    ref: 'Session',
    required: true,
  },
  patientId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  clinicianId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: {
    type: [MessageSchema],
    required: true,
  },
});

module.exports = Chat = mongoose.model('chats', ChatSchema);
