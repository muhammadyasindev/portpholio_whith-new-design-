const mongoose = require('mongoose');
const store = require('../storage/dataStore');
const { getMongoStatus } = require('../config/db');
const Service = require('../models/Service');

const getServices = async (req, res) => {
  try {
    if (getMongoStatus()) {
      const services = await Service.find().sort({ order: 1 });
      if (services && services.length > 0) {
        return res.json({ success: true, count: services.length, services });
      }
    }
    const services = store.getServices();
    res.json({ success: true, count: services.length, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { title, icon, shortDescription, description, deliverables } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and Description are required.' });
    }

    const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const servicePayload = {
      title,
      slug,
      icon: icon || 'Monitor',
      shortDescription: shortDescription || description.slice(0, 100),
      description,
      deliverables: Array.isArray(deliverables) ? deliverables : []
    };

    let result = null;
    if (getMongoStatus()) {
      try {
        result = await Service.create(servicePayload);
      } catch (err) {
        console.warn('[Service] MongoDB creation error:', err.message);
      }
    }

    const createdStore = store.createService(result ? { ...servicePayload, _id: result._id.toString() } : servicePayload);
    if (!result) result = createdStore;

    res.status(201).json({ success: true, message: 'Service created successfully.', service: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedService = null;

    if (getMongoStatus()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        } else {
          updatedService = await Service.findOneAndUpdate({ slug: id }, req.body, { new: true });
        }
      } catch (mongoErr) {
        console.warn('[Service Update] Atlas error:', mongoErr.message);
      }
    }

    const storeUpdated = store.updateService(id, req.body);
    if (!updatedService && storeUpdated) {
      updatedService = storeUpdated;
    }

    if (!updatedService) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.json({ success: true, message: 'Service updated successfully.', service: updatedService });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (getMongoStatus()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const doc = await Service.findByIdAndDelete(id);
          if (doc) deleted = true;
        } else {
          const doc = await Service.findOneAndDelete({ slug: id });
          if (doc) deleted = true;
        }
      } catch (mongoErr) {
        console.warn('[Service Delete] Atlas error:', mongoErr.message);
      }
    }

    const storeDeleted = store.deleteService(id);
    if (storeDeleted) deleted = true;

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getServices, createService, updateService, deleteService };
