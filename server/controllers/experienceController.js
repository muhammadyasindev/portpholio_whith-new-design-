const mongoose = require('mongoose');
const store = require('../storage/dataStore');
const { getMongoStatus } = require('../config/db');
const Experience = require('../models/Experience');

const getExperiences = async (req, res) => {
  try {
    const { type } = req.query;

    if (getMongoStatus()) {
      let query = {};
      if (type) query.type = type;

      const experiences = await Experience.find(query).sort({ order: 1, createdAt: -1 });
      if (experiences && experiences.length > 0) {
        return res.json({ success: true, count: experiences.length, experiences });
      }
    }

    let experiences = store.getExperiences();
    if (type) {
      experiences = experiences.filter(e => e.type === type);
    }

    res.json({ success: true, count: experiences.length, experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createExperience = async (req, res) => {
  try {
    const { title, organization, location, period, description, skillsUsed, type } = req.body;

    if (!title || !organization || !period) {
      return res.status(400).json({ success: false, message: 'Title, Organization and Period are required.' });
    }

    const skillsArray = Array.isArray(skillsUsed)
      ? skillsUsed
      : typeof skillsUsed === 'string'
      ? skillsUsed.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const expData = {
      type: type || 'experience',
      title,
      organization,
      location: location || '',
      period,
      description: description || '',
      skillsUsed: skillsArray
    };

    let result = null;
    if (getMongoStatus()) {
      try {
        result = await Experience.create(expData);
      } catch (err) {
        console.warn('[Experience] MongoDB creation error:', err.message);
      }
    }

    const createdStore = store.createExperience(result ? { ...expData, _id: result._id.toString() } : expData);
    if (!result) result = createdStore;

    res.status(201).json({ success: true, message: 'Experience record created.', experience: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (typeof updates.skillsUsed === 'string') {
      updates.skillsUsed = updates.skillsUsed.split(',').map(s => s.trim()).filter(Boolean);
    }

    let updatedExp = null;

    if (getMongoStatus()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          updatedExp = await Experience.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        }
      } catch (mongoErr) {
        console.warn('[Experience Update] Atlas error:', mongoErr.message);
      }
    }

    const storeUpdated = store.updateExperience(id, updates);
    if (!updatedExp && storeUpdated) {
      updatedExp = storeUpdated;
    }

    if (!updatedExp) {
      return res.status(404).json({ success: false, message: 'Experience record not found.' });
    }

    res.json({ success: true, message: 'Experience updated successfully.', experience: updatedExp });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (getMongoStatus()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const doc = await Experience.findByIdAndDelete(id);
          if (doc) deleted = true;
        }
      } catch (mongoErr) {
        console.warn('[Experience Delete] Atlas error:', mongoErr.message);
      }
    }

    const storeDeleted = store.deleteExperience(id);
    if (storeDeleted) deleted = true;

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Experience record not found.' });
    }

    res.json({ success: true, message: 'Experience deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };
