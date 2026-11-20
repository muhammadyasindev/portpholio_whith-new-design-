const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  icon: { type: String, default: 'Layout' },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  deliverables: [{ type: String }],
  order: { type: Number, default: 0 }
});

module.exports = mongoose.models.Service || mongoose.model('Service', serviceSchema);
