const mongoose = require('mongoose');
const store = require('../storage/dataStore');
const { getMongoStatus } = require('../config/db');
const Skill = require('../models/Skill');

const getSkills = async (req, res) => {
  try {
    if (getMongoStatus()) {
      const skills = await Skill.find();
      if (skills && skills.length > 0) {
        return res.json({ success: true, count: skills.length, skills });
      }
    }
    const skills = store.getSkills();
    res.json({ success: true, count: skills.length, skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createSkill = async (req, res) => {
  try {
    const { name, category, proficiency, icon, level, isFeatured } = req.body;
    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Name and Category are required.' });
    }

    const skillPayload = {
      name,
      category,
      proficiency: Number(proficiency) || 80,
      icon: icon || 'Code',
      level: level || 'Advanced',
      isFeatured: !!isFeatured
    };

    let result = null;

    if (getMongoStatus()) {
      try {
        result = await Skill.create(skillPayload);
      } catch (err) {
        console.warn('[Skill] MongoDB creation error:', err.message);
      }
    }

    const createdStore = store.createSkill(result ? { ...skillPayload, _id: result._id.toString() } : skillPayload);
    if (!result) result = createdStore;

    res.status(201).json({ success: true, message: 'Skill created successfully.', skill: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedSkill = null;

    if (getMongoStatus()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          updatedSkill = await Skill.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        } else {
          updatedSkill = await Skill.findOneAndUpdate({ name: req.body.name }, req.body, { new: true });
        }
      } catch (mongoErr) {
        console.warn('[Skill Update] Atlas error:', mongoErr.message);
      }
    }

    const storeUpdated = store.updateSkill(id, req.body);
    if (!updatedSkill && storeUpdated) {
      updatedSkill = storeUpdated;
    }

    if (!updatedSkill) {
      return res.status(404).json({ success: false, message: 'Skill not found.' });
    }

    res.json({ success: true, message: 'Skill updated successfully.', skill: updatedSkill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (getMongoStatus()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const doc = await Skill.findByIdAndDelete(id);
          if (doc) deleted = true;
        }
      } catch (mongoErr) {
        console.warn('[Skill Delete] Atlas error:', mongoErr.message);
      }
    }

    const storeDeleted = store.deleteSkill(id);
    if (storeDeleted) deleted = true;

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Skill not found.' });
    }

    res.json({ success: true, message: 'Skill deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
