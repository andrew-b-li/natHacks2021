const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Connection = new Schema({
  requestStatus: {
    type: String, // requested, accepted, etc
    required: true,
  },
  targetUserId: {
    type: Number,
    required: true,
  },
});

const GameData = new Schema({
  gameType: {
    type: String,
    required: true,
  },
  highScore: {
    type: Number,
    required: true,
  },
});

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  connections: {
    type: [Connection],
    required: true,
  },
  pendingActions: {
    type: [String],
    required: true,
  },
  gameData: {
    type: [GameData],
    required: true,
  }
});

module.exports = User = mongoose.model('users', UserSchema);
