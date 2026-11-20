const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const store = require('../storage/dataStore');
const { getMongoStatus } = require('../config/db');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'super_secret_jwt_portfolio_key_998877665544332211'
      );

      if (getMongoStatus()) {
        let user = null;
        if (decoded.id && mongoose.Types.ObjectId.isValid(decoded.id)) {
          user = await User.findById(decoded.id).select('-password');
        }
        if (!user && decoded.email) {
          user = await User.findOne({ email: decoded.email.toLowerCase() }).select('-password');
        }
        if (user) {
          req.user = user;
          return next();
        }
      }

      const user = store.getUserByEmail(decoded.email) || store.getUser();
      if (user) {
        req.user = { _id: user._id || 'usr_admin_default_01', email: user.email || decoded.email, name: user.name || 'Muhammad Yasin', role: user.role || 'admin' };
        return next();
      }

      return res.status(401).json({ success: false, message: 'User not found or authorization revoked.' });
    } catch (error) {
      console.error('[AuthMiddleware] Token error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, invalid token.' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided.' });
  }
};

module.exports = { protect };
