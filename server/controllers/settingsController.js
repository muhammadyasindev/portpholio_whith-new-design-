const store = require('../storage/dataStore');
const { getMongoStatus } = require('../config/db');
const Settings = require('../models/Settings');

const getSettings = async (req, res) => {
  try {
    if (getMongoStatus()) {
      const settings = await Settings.findOne();
      if (settings) {
        return res.json({ success: true, settings });
      }
    }
    const settings = store.getSettings();
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const updated = store.updateSettings(req.body);

    if (getMongoStatus()) {
      await Settings.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    }

    res.json({ success: true, message: 'Settings updated successfully.', settings: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSettings, updateSettings };
