const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const store = require('../storage/dataStore');
const { getMongoStatus } = require('../config/db');
const User = require('../models/User');

const generateToken = (id, email) => {
  return jwt.sign(
    { id: id ? id.toString() : 'usr_admin_default_01', email },
    process.env.JWT_SECRET || 'super_secret_jwt_portfolio_key_998877665544332211',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

const login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@portfolio.com').trim().toLowerCase();
    const rawEnvPass = process.env.ADMIN_PASSWORD || 'adminpassword123';
    const envAdminPassword = rawEnvPass.replace(/^['"](.*)['"]$/, '$1').trim();
    const cleanPassword = String(password || '').trim();
    
    const isEnvAdminLogin = (
      cleanEmail === envAdminEmail &&
      (cleanPassword === envAdminPassword || cleanPassword === rawEnvPass || password === rawEnvPass || password === envAdminPassword)
    );

    if (getMongoStatus()) {
      try {
        let user = await User.findOne({ email: cleanEmail });

        if (!user && isEnvAdminLogin) {
          user = await User.create({
            name: 'Muhammad Yasin',
            email: cleanEmail,
            password: envAdminPassword,
            role: 'admin'
          });
        }

        if (user) {
          let isMatch = await user.matchPassword(cleanPassword) || await user.matchPassword(password);
          if (!isMatch && isEnvAdminLogin) {
            user.password = envAdminPassword;
            await user.save();
            isMatch = true;
          }

          if (isMatch) {
            return res.json({
              success: true,
              token: generateToken(user._id, user.email),
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
              }
            });
          }
        }
      } catch (mongoErr) {
        console.warn('[Auth] Atlas query warning, checking local fallback store:', mongoErr.message);
      }
    }

    const storeUser = store.getUserByEmail(cleanEmail);
    if (storeUser) {
      let isMatch = bcrypt.compareSync(cleanPassword, storeUser.password) || bcrypt.compareSync(password, storeUser.password);
      if (!isMatch && isEnvAdminLogin) {
        store.updateUser({ password: bcrypt.hashSync(envAdminPassword, 10) });
        isMatch = true;
      }

      if (isMatch) {
        return res.json({
          success: true,
          token: generateToken(storeUser._id, storeUser.email),
          user: {
            id: storeUser._id,
            name: storeUser.name,
            email: storeUser.email,
            role: storeUser.role
          }
        });
      }
    }

    if (isEnvAdminLogin) {
      return res.json({
        success: true,
        token: generateToken('usr_admin_default_01', envAdminEmail),
        user: {
          id: 'usr_admin_default_01',
          name: 'Muhammad Yasin',
          email: envAdminEmail,
          role: 'admin'
        }
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password credentials.' });
  } catch (error) {
    console.error('[Auth Error]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Current and new password are required.' });
  }

  try {
    const storeUser = store.getUserByEmail(req.user.email);
    if (!storeUser || !bcrypt.compareSync(currentPassword, storeUser.password)) {
      return res.status(400).json({ success: false, message: 'Incorrect current password.' });
    }

    const hashed = bcrypt.hashSync(newPassword, 10);
    store.updateUser({ password: hashed });

    if (getMongoStatus()) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.password = newPassword;
        await user.save();
      }
    }

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login, getMe, updatePassword };
