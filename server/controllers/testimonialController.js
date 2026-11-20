const mongoose = require('mongoose');
const store = require('../storage/dataStore');
const { getMongoStatus } = require('../config/db');
const Testimonial = require('../models/Testimonial');

const getTestimonials = async (req, res) => {
  try {
    if (getMongoStatus()) {
      const testimonials = await Testimonial.find().sort({ order: 1 });
      if (testimonials && testimonials.length > 0) {
        return res.json({ success: true, count: testimonials.length, testimonials });
      }
    }
    const testimonials = store.getTestimonials();
    res.json({ success: true, count: testimonials.length, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const { clientName, role, company, feedback, avatar, rating, project } = req.body;

    if (!clientName || !feedback) {
      return res.status(400).json({ success: false, message: 'Client Name and Feedback are required.' });
    }

    const testData = {
      clientName,
      role: role || 'Client',
      company: company || '',
      feedback,
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      rating: Number(rating) || 5,
      project: project || ''
    };

    let result = null;
    if (getMongoStatus()) {
      try {
        result = await Testimonial.create(testData);
      } catch (err) {
        console.warn('[Testimonial] MongoDB creation error:', err.message);
      }
    }

    const createdStore = store.createTestimonial(result ? { ...testData, _id: result._id.toString() } : testData);
    if (!result) result = createdStore;

    res.status(201).json({ success: true, message: 'Testimonial created.', testimonial: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedTest = null;

    if (getMongoStatus()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          updatedTest = await Testimonial.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        }
      } catch (mongoErr) {
        console.warn('[Testimonial Update] Atlas error:', mongoErr.message);
      }
    }

    const storeUpdated = store.updateTestimonial(id, req.body);
    if (!updatedTest && storeUpdated) {
      updatedTest = storeUpdated;
    }

    if (!updatedTest) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }

    res.json({ success: true, message: 'Testimonial updated.', testimonial: updatedTest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (getMongoStatus()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const doc = await Testimonial.findByIdAndDelete(id);
          if (doc) deleted = true;
        }
      } catch (mongoErr) {
        console.warn('[Testimonial Delete] Atlas error:', mongoErr.message);
      }
    }

    const storeDeleted = store.deleteTestimonial(id);
    if (storeDeleted) deleted = true;

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }

    res.json({ success: true, message: 'Testimonial deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
