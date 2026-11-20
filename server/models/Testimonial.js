const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  company: { type: String, default: '' },
  avatar: { type: String, default: '' },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  content: { type: String, required: true },
  project: { type: String, default: '' },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
