const fs = require('fs');
const path = require('path');
const initialData = require('./initialData');

const DATA_FILE = path.join(__dirname, 'data.json');

class DataStore {
  constructor() {
    this.data = null;
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_FILE)) {
        this.data = JSON.parse(JSON.stringify(initialData));
        this.save();
        console.log('[DataStore] Initialized fresh persistent data store from template.');
      } else {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        console.log('[DataStore] Loaded existing data store successfully.');
      }
    } catch (err) {
      console.error('[DataStore] Error reading file, resetting to initial data:', err);
      this.data = JSON.parse(JSON.stringify(initialData));
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[DataStore] Error writing to data file:', err);
    }
  }

  getProfile() {
    return this.data.profile;
  }
  updateProfile(updates) {
    this.data.profile = { ...this.data.profile, ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.profile;
  }

  getAbout() {
    return this.data.about;
  }
  updateAbout(updates) {
    this.data.about = { ...this.data.about, ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.about;
  }

  getSkills() {
    return this.data.skills || [];
  }
  createSkill(skill) {
    const newSkill = {
      _id: 'skl_' + Date.now() + Math.random().toString(36).substring(2, 6),
      ...skill
    };
    this.data.skills.push(newSkill);
    this.save();
    return newSkill;
  }
  updateSkill(id, updates) {
    const index = this.data.skills.findIndex(s => s._id === id);
    if (index === -1) return null;
    this.data.skills[index] = { ...this.data.skills[index], ...updates };
    this.save();
    return this.data.skills[index];
  }
  deleteSkill(id) {
    const index = this.data.skills.findIndex(s => s._id === id);
    if (index === -1) return false;
    this.data.skills.splice(index, 1);
    this.save();
    return true;
  }

  getServices() {
    return (this.data.services || []).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  createService(service) {
    const newService = {
      _id: 'srv_' + Date.now() + Math.random().toString(36).substring(2, 6),
      order: this.data.services.length + 1,
      ...service
    };
    this.data.services.push(newService);
    this.save();
    return newService;
  }
  updateService(id, updates) {
    const index = this.data.services.findIndex(s => s._id === id);
    if (index === -1) return null;
    this.data.services[index] = { ...this.data.services[index], ...updates };
    this.save();
    return this.data.services[index];
  }
  deleteService(id) {
    const index = this.data.services.findIndex(s => s._id === id);
    if (index === -1) return false;
    this.data.services.splice(index, 1);
    this.save();
    return true;
  }

  getProjects() {
    return (this.data.projects || []).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  getProjectById(id) {
    return this.data.projects.find(p => p._id === id || p.slug === id);
  }
  createProject(project) {
    const newProject = {
      _id: 'prj_' + Date.now() + Math.random().toString(36).substring(2, 6),
      order: this.data.projects.length + 1,
      isFeatured: !!project.isFeatured,
      technologies: Array.isArray(project.technologies) ? project.technologies : [],
      screenshots: Array.isArray(project.screenshots) ? project.screenshots : [],
      ...project
    };
    this.data.projects.push(newProject);
    this.save();
    return newProject;
  }
  updateProject(id, updates) {
    const index = this.data.projects.findIndex(p => p._id === id);
    if (index === -1) return null;
    this.data.projects[index] = { ...this.data.projects[index], ...updates };
    this.save();
    return this.data.projects[index];
  }
  deleteProject(id) {
    const index = this.data.projects.findIndex(p => p._id === id);
    if (index === -1) return false;
    this.data.projects.splice(index, 1);
    this.save();
    return true;
  }

  getExperiences() {
    return (this.data.experiences || []).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  createExperience(exp) {
    const newExp = {
      _id: 'exp_' + Date.now() + Math.random().toString(36).substring(2, 6),
      order: this.data.experiences.length + 1,
      skillsUsed: Array.isArray(exp.skillsUsed) ? exp.skillsUsed : [],
      ...exp
    };
    this.data.experiences.push(newExp);
    this.save();
    return newExp;
  }
  updateExperience(id, updates) {
    const index = this.data.experiences.findIndex(e => e._id === id);
    if (index === -1) return null;
    this.data.experiences[index] = { ...this.data.experiences[index], ...updates };
    this.save();
    return this.data.experiences[index];
  }
  deleteExperience(id) {
    const index = this.data.experiences.findIndex(e => e._id === id);
    if (index === -1) return false;
    this.data.experiences.splice(index, 1);
    this.save();
    return true;
  }

  getTestimonials() {
    return (this.data.testimonials || []).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  createTestimonial(test) {
    const newTest = {
      _id: 'tst_' + Date.now() + Math.random().toString(36).substring(2, 6),
      order: this.data.testimonials.length + 1,
      rating: Number(test.rating) || 5,
      ...test
    };
    this.data.testimonials.push(newTest);
    this.save();
    return newTest;
  }
  updateTestimonial(id, updates) {
    const index = this.data.testimonials.findIndex(t => t._id === id);
    if (index === -1) return null;
    this.data.testimonials[index] = { ...this.data.testimonials[index], ...updates };
    this.save();
    return this.data.testimonials[index];
  }
  deleteTestimonial(id) {
    const index = this.data.testimonials.findIndex(t => t._id === id);
    if (index === -1) return false;
    this.data.testimonials.splice(index, 1);
    this.save();
    return true;
  }

  getMessages() {
    return (this.data.messages || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  createMessage(msg) {
    const newMsg = {
      _id: 'msg_' + Date.now() + Math.random().toString(36).substring(2, 6),
      status: 'unread',
      isStarred: false,
      createdAt: new Date().toISOString(),
      ...msg
    };
    if (!this.data.messages) this.data.messages = [];
    this.data.messages.unshift(newMsg);
    this.save();
    return newMsg;
  }
  updateMessageStatus(id, updates) {
    const index = this.data.messages.findIndex(m => m._id === id);
    if (index === -1) return null;
    this.data.messages[index] = { ...this.data.messages[index], ...updates };
    this.save();
    return this.data.messages[index];
  }
  deleteMessage(id) {
    const index = this.data.messages.findIndex(m => m._id === id);
    if (index === -1) return false;
    this.data.messages.splice(index, 1);
    this.save();
    return true;
  }

  getSettings() {
    return this.data.settings;
  }
  updateSettings(updates) {
    this.data.settings = { ...this.data.settings, ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.settings;
  }

  getUserByEmail(email) {
    if (!email) return null;
    if (this.data.user && this.data.user.email && this.data.user.email.toLowerCase() === email.toLowerCase()) {
      return this.data.user;
    }
    return null;
  }
  updateUser(idOrUpdates, maybeUpdates) {
    const updates = maybeUpdates || idOrUpdates || {};
    this.data.user = { ...this.data.user, ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.user;
  }

  getFullPortfolio() {
    return {
      profile: this.getProfile(),
      about: this.getAbout(),
      skills: this.getSkills(),
      services: this.getServices(),
      projects: this.getProjects(),
      experiences: this.getExperiences(),
      testimonials: this.getTestimonials(),
      settings: this.getSettings()
    };
  }
}

const store = new DataStore();
module.exports = store;
