const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['experience', 'education', 'certification'],
    default: 'experience'
  },
  title: { type: String, required: true },
  organization: { type: String, required: true },
  location: { type: String, default: '' },
  period: { type: String, required: true },
  description: { type: String, required: true },
  skillsUsed: [{ type: String }],
  order: { type: Number, default: 0 }
});

module.exports = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
