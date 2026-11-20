const mongoose = require('mongoose');
const store = require('../storage/dataStore');
const { getMongoStatus } = require('../config/db');
const Project = require('../models/Project');

const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;

    if (getMongoStatus()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }
      if (featured === 'true') {
        query.isFeatured = true;
      }

      const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
      if (projects && projects.length > 0) {
        return res.json({ success: true, count: projects.length, projects });
      }
    }

    let projects = store.getProjects();
    if (category && category !== 'All') {
      projects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (featured === 'true') {
      projects = projects.filter(p => p.isFeatured);
    }

    res.json({ success: true, count: projects.length, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const param = req.params.idOrSlug;

    if (getMongoStatus()) {
      const isObjectId = mongoose.Types.ObjectId.isValid(param);
      const project = await Project.findOne({
        $or: [
          isObjectId ? { _id: param } : null,
          { slug: param }
        ].filter(Boolean)
      });
      if (project) {
        return res.json({ success: true, project });
      }
    }

    const project = store.getProjectById(param);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const {
      title,
      category,
      shortDescription,
      description,
      thumbnail,
      screenshots,
      technologies,
      liveUrl,
      githubUrl,
      isFeatured,
      year,
      client
    } = req.body;

    if (!title || !thumbnail || !description) {
      return res.status(400).json({ success: false, message: 'Title, Thumbnail and Description are required.' });
    }

    const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const techArray = Array.isArray(technologies)
      ? technologies
      : typeof technologies === 'string'
      ? technologies.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const screenshotsArray = Array.isArray(screenshots)
      ? screenshots
      : typeof screenshots === 'string'
      ? screenshots.split(',').map(s => s.trim()).filter(Boolean)
      : [thumbnail];

    const projectData = {
      title,
      slug,
      category: category || 'Web Application',
      shortDescription: shortDescription || description.slice(0, 120),
      description,
      thumbnail,
      screenshots: screenshotsArray,
      technologies: techArray,
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      isFeatured: !!isFeatured,
      year: year || '2026',
      client: client || 'Commercial'
    };

    let result = null;
    if (getMongoStatus()) {
      try {
        result = await Project.create(projectData);
      } catch (err) {
        console.warn('[Project] MongoDB creation error:', err.message);
      }
    }

    const createdStore = store.createProject(result ? { ...projectData, _id: result._id.toString() } : projectData);
    if (!result) result = createdStore;

    res.status(201).json({ success: true, message: 'Project created successfully.', project: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (typeof updates.technologies === 'string') {
      updates.technologies = updates.technologies.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (typeof updates.screenshots === 'string') {
      updates.screenshots = updates.screenshots.split(',').map(s => s.trim()).filter(Boolean);
    }

    let updatedProject = null;

    if (getMongoStatus()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        } else {
          updatedProject = await Project.findOneAndUpdate({ slug: id }, updates, { new: true });
        }
      } catch (mongoErr) {
        console.warn('[Project Update] Atlas error:', mongoErr.message);
      }
    }

    const storeUpdated = store.updateProject(id, updates);
    if (!updatedProject && storeUpdated) {
      updatedProject = storeUpdated;
    }

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.json({ success: true, message: 'Project updated successfully.', project: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (getMongoStatus()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const doc = await Project.findByIdAndDelete(id);
          if (doc) deleted = true;
        } else {
          const doc = await Project.findOneAndDelete({ slug: id });
          if (doc) deleted = true;
        }
      } catch (mongoErr) {
        console.warn('[Project Delete] Atlas error:', mongoErr.message);
      }
    }

    const storeDeleted = store.deleteProject(id);
    if (storeDeleted) deleted = true;

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };
