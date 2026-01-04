const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  donation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  point: { type: mongoose.Schema.Types.ObjectId, ref: 'Point', required: true },
  scheduledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scheduledFor: { type: Date, required: true },
  status: { type: String, enum: ['PENDING','CONFIRMED','RECEIVED','CANCELLED'], default:'PENDING'},
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
