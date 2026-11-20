const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, required: true, default: 'Full Stack' },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  screenshots: [{ type: String }],
  technologies: [{ type: String }],
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  year: { type: String, default: '2025' },
  client: { type: String, default: '' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
