const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, updateAbout } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProfile);
router.put('/', protect, updateProfile);
router.put('/about', protect, updateAbout);

module.exports = router;
