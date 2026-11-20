const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  headline: { type: String, required: true },
  shortIntro: { type: String, required: true },
  location: { type: String, default: 'Balochistan, Pakistan' },
  availabilityStatus: { type: String, default: 'Available for Freelance & Collaboration' },
  isAvailable: { type: Boolean, default: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  avatar: { type: String, default: '' },
  heroBadgeText: { type: String, default: 'Full Stack Web & App Developer' },
  yearsOfExperience: { type: Number, default: 5 },
  completedProjects: { type: Number, default: 45 },
  technologiesCount: { type: Number, default: 28 },
  clientSatisfaction: { type: Number, default: 99 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
