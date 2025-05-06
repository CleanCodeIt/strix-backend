'use strict';

const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Secret key for JWT - should be in .env file in a production environment
const JWT_SECRET = process.env.JWT_SECRET || 'strix-secret-key';

/**
 * Middleware to authenticate token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    const token = authHeader?.split(' ')?.[1]; // Bearer TOKEN format
    
    if (!token) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    
    if (!user || !user.isActive) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Invalid token or user is inactive' 
      });
    }

    // Add user info to request object
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(403).json({ 
      status: 'error', 
      message: 'Invalid or expired token' 
    });
  }
};

/**
 * Middleware to check if user is admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const isAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Admin rights required.'
    });
  }
  
  next();
};

module.exports = {
  authenticateToken,
  isAdmin
};