const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  scoreCalcMethod: {
    type: String,
    required: true,
  },
  difficultyLevel: {
    type: String,
    required: true,
  },
});

const StatsSchema = new Schema({
  totalDuration: {
    type: Number,
    required: true,
  },
  repsCompleted: {
    type: Number,
    requyird: true,
  },
});

const WaveformPoint = new Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
});

const SessionSchema = new Schema({
  // sessionId: {
  //   type: Number,
  //   required: true,
  // },
  eventId: {
    type: Schema.ObjectId,
    ref: 'Event',
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
  taskType: {
    type: String,
    required: true,
  },
  waveformTimeSeries: {
    type: [WaveformPoint],
    // required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  protocolType: {
    type: String,
    required: true,
  },
  scheduledFor: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: undefined,
  },
  reviewedAt: {
    type: Date,
    default: undefined,
  },
  settings: {
    type: SettingSchema,
    default: undefined,
  },
  stats: {
    type: StatsSchema,
    default: undefined,
  },
});

module.exports = Session = mongoose.model('sessions', SessionSchema);
