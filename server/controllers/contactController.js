const mongoose = require('mongoose');
const store = require('../storage/dataStore');
const { getMongoStatus } = require('../config/db');
const ContactMessage = require('../models/ContactMessage');

const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name, valid email, and your message.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const messageData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject || 'General Inquiry').trim(),
      service: (service || 'General Inquiry').trim(),
      message: message.trim(),
      status: 'unread',
      isStarred: false,
      createdAt: new Date().toISOString()
    };

    let saved = null;
    if (getMongoStatus()) {
      try {
        saved = await ContactMessage.create(messageData);
      } catch (err) {
        console.warn('[Contact] MongoDB creation error:', err.message);
      }
    }

    const storeSaved = store.createMessage(saved ? { ...messageData, _id: saved._id.toString() } : messageData);
    if (!saved) saved = storeSaved;

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received successfully. I will get back to you shortly.',
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { status, starred } = req.query;

    if (getMongoStatus()) {
      let query = {};
      if (status) query.status = status;
      if (starred === 'true') query.isStarred = true;

      const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
      if (messages && messages.length > 0) {
        return res.json({ success: true, count: messages.length, messages });
      }
    }

    let messages = store.getMessages();
    if (status) {
      messages = messages.filter(m => m.status === status);
    }
    if (starred === 'true') {
      messages = messages.filter(m => m.isStarred);
    }

    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedMsg = null;

    if (getMongoStatus()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          updatedMsg = await ContactMessage.findByIdAndUpdate(id, req.body, { new: true });
        }
      } catch (mongoErr) {
        console.warn('[Message Update] Atlas error:', mongoErr.message);
      }
    }

    const storeUpdated = store.updateMessageStatus(id, req.body);
    if (!updatedMsg && storeUpdated) {
      updatedMsg = storeUpdated;
    }

    if (!updatedMsg) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    res.json({ success: true, message: 'Message updated successfully.', messageItem: updatedMsg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (getMongoStatus()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const doc = await ContactMessage.findByIdAndDelete(id);
          if (doc) deleted = true;
        }
      } catch (mongoErr) {
        console.warn('[Message Delete] Atlas error:', mongoErr.message);
      }
    }

    const storeDeleted = store.deleteMessage(id);
    if (storeDeleted) deleted = true;

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendMessage, getMessages, updateMessage, deleteMessage };
