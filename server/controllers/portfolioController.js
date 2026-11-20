const store = require('../storage/dataStore');
const { getMongoStatus } = require('../config/db');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Testimonial = require('../models/Testimonial');
const Settings = require('../models/Settings');

const getFullPortfolio = async (req, res) => {
  try {
    if (getMongoStatus()) {
      try {
        const [profile, skills, services, projects, experiences, testimonials, settings] = await Promise.all([
          Profile.findOne(),
          Skill.find(),
          Service.find().sort({ order: 1 }),
          Project.find().sort({ order: 1 }),
          Experience.find().sort({ order: 1 }),
          Testimonial.find().sort({ order: 1 }),
          Settings.findOne()
        ]);

        if (profile && projects && projects.length > 0) {
          return res.json({
            success: true,
            data: {
              profile,
              about: store.getAbout(),
              skills: skills.length > 0 ? skills : store.getSkills(),
              services: services.length > 0 ? services : store.getServices(),
              projects: projects.length > 0 ? projects : store.getProjects(),
              experiences: experiences.length > 0 ? experiences : store.getExperiences(),
              testimonials: testimonials.length > 0 ? testimonials : store.getTestimonials(),
              settings: settings || store.getSettings()
            }
          });
        }
      } catch (mongoErr) {
        console.warn('[Portfolio] MongoDB query warning, falling back to persistent store:', mongoErr.message);
      }
    }

    const data = store.getFullPortfolio();
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('[Portfolio Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getFullPortfolio };
