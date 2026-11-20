const store = require('../storage/dataStore');
const { getMongoStatus } = require('../config/db');
const Profile = require('../models/Profile');

const getProfile = async (req, res) => {
  try {
    if (getMongoStatus()) {
      const profile = await Profile.findOne();
      if (profile) {
        return res.json({ success: true, profile, about: store.getAbout() });
      }
    }
    const profile = store.getProfile();
    const about = store.getAbout();
    return res.json({ success: true, profile, about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updated = store.updateProfile(req.body);

    if (getMongoStatus()) {
      await Profile.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    }

    res.json({ success: true, message: 'Profile updated successfully.', profile: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateAbout = async (req, res) => {
  try {
    const updated = store.updateAbout(req.body);
    res.json({ success: true, message: 'About section updated successfully.', about: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProfile, updateProfile, updateAbout };
