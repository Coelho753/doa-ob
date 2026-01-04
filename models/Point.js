const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactName: String,
  phone: String,
  email: String,
  address: {
    street: String, city: String, state: String, zip: String,
    geo: { type: { type: String, default: 'Point' }, coordinates: [Number] } // [lng, lat]
  },
  openingHours: String,
  accepts: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
PointSchema.index({ 'address.geo': '2dsphere' });
module.exports = mongoose.model('Point', PointSchema);
