const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteTitle: { type: String, default: 'DYMAS ALFIN — Personal Portfolio' },
  siteTagline: { type: String, default: 'Designing digital products that are clear, usable, and conversion focused.' },
  metaDescription: { type: String, default: 'Official portfolio showcasing selected digital products, UI/UX systems, and full-stack applications.' },
  keywords: { type: String, default: 'UI/UX Designer, Product Designer, Full Stack Developer, React, Portfolio' },
  ogImage: { type: String, default: '/designer_headshot.jpg' },
  canonicalUrl: { type: String, default: 'https://portfolio.dev' },
  allowRobotsIndex: { type: Boolean, default: true },
  author: { type: String, default: 'DYMAS ALFIN' },
  twitterHandle: { type: String, default: '@portfolio' },
  socialLinks: {
    dribbble: { type: String, default: 'https://dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations' },
    instagram: { type: String, default: 'https://instagram.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    github: { type: String, default: 'https://github.com' },
    twitter: { type: String, default: 'https://twitter.com' },
    whatsapp: { type: String, default: 'https://wa.me/923123456789' },
    behance: { type: String, default: 'https://behance.net' },
    youtube: { type: String, default: 'https://youtube.com' }
  },
  theme: {
    primaryBg: { type: String, default: '#FFFFFF' },
    secondaryBg: { type: String, default: '#FAFAFA' },
    primaryText: { type: String, default: '#000000' },
    secondaryText: { type: String, default: '#737373' },
    accentColor: { type: String, default: '#000000' },
    headingFont: { type: String, default: 'Syne, sans-serif' },
    bodyFont: { type: String, default: 'Plus Jakarta Sans, sans-serif' },
    animationPreference: { type: String, default: 'smooth' }
  },
  enableAnimations: { type: Boolean, default: true },
  allowMessages: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
