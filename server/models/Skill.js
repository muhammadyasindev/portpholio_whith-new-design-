const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      'Frontend Development',
      'Backend Development',
      'Mobile App Development',
      'Databases',
      'Programming Languages',
      'Tools & Technologies'
    ]
  },
  proficiency: { type: Number, required: true, min: 0, max: 100, default: 85 },
  icon: { type: String, default: 'Code' },
  level: { type: String, default: 'Advanced' },
  isFeatured: { type: Boolean, default: false }
});

module.exports = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
