const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  updateMessage,
  deleteMessage
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', sendMessage);
router.get('/messages', protect, getMessages);
router.put('/messages/:id', protect, updateMessage);
router.delete('/messages/:id', protect, deleteMessage);

module.exports = router;
