'use strict';

const { Licitation, User } = require('../models');

/**
 * Licitation Controller
 * Handles all operations related to licitations
 */
const licitationController = {
  /**
   * Get all licitations
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  getAllLicitations: async (req, res) => {
    try {
      const licitations = await Licitation.findAll({
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'email']
        }]
      });
      
      return res.status(200).json({
        status: 'success',
        data: licitations
      });
    } catch (error) {
      console.error('Error fetching licitations:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch licitations',
        error: error.message
      });
    }
  },

  /**
   * Get a licitation by ID
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  getLicitationById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const licitation = await Licitation.findByPk(id, {
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'email']
        }]
      });
      
      if (!licitation) {
        return res.status(404).json({
          status: 'error',
          message: `Licitation with ID ${id} not found`
        });
      }
      
      return res.status(200).json({
        status: 'success',
        data: licitation
      });
    } catch (error) {
      console.error(`Error fetching licitation with ID ${req.params?.id}:`, error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch licitation',
        error: error.message
      });
    }
  },

  /**
   * Create a new licitation
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  createLicitation: async (req, res) => {
    try {
      const { title, description, startDate, endDate, isLowestPrice } = req.body;
      const userId = req.user?.id; // Get user ID from auth middleware
      
      // Validate required fields
      if (!title || !description || !startDate || !endDate) {
        return res.status(400).json({
          status: 'error',
          message: 'Missing required fields: title, description, startDate, endDate'
        });
      }

      // Validate dates
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (isNaN(start.getTime())) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid start date'
        });
      }
      
      if (isNaN(end.getTime())) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid end date'
        });
      }
      
      if (end <= start) {
        return res.status(400).json({
          status: 'error',
          message: 'End date must be after start date'
        });
      }
      
      // Create licitation
      const newLicitation = await Licitation.create({
        title,
        description,
        startDate,
        endDate,
        isLowestPrice: isLowestPrice ?? true,
        userId
      });
      
      return res.status(201).json({
        status: 'success',
        message: 'Licitation created successfully',
        data: newLicitation
      });
    } catch (error) {
      console.error('Error creating licitation:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to create licitation',
        error: error.message
      });
    }
  },

  /**
   * Update a licitation
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  updateLicitation: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, startDate, endDate, isLowestPrice } = req.body;
      const userId = req.user?.id; // Get user ID from auth middleware
      
      // Find licitation
      const licitation = await Licitation.findByPk(id);
      
      if (!licitation) {
        return res.status(404).json({
          status: 'error',
          message: `Licitation with ID ${id} not found`
        });
      }
      
      // Check if user is authorized to update this licitation
      if (licitation.userId !== userId && !req.user?.isAdmin) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to update this licitation'
        });
      }
      
      // Validate dates if provided
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          return res.status(400).json({
            status: 'error',
            message: 'Invalid date format'
          });
        }
        
        if (end <= start) {
          return res.status(400).json({
            status: 'error',
            message: 'End date must be after start date'
          });
        }
      } else if (startDate && !endDate) {
        const start = new Date(startDate);
        const end = new Date(licitation.endDate);
        
        if (isNaN(start.getTime())) {
          return res.status(400).json({
            status: 'error',
            message: 'Invalid start date format'
          });
        }
        
        if (end <= start) {
          return res.status(400).json({
            status: 'error',
            message: 'End date must be after new start date'
          });
        }
      } else if (!startDate && endDate) {
        const start = new Date(licitation.startDate);
        const end = new Date(endDate);
        
        if (isNaN(end.getTime())) {
          return res.status(400).json({
            status: 'error',
            message: 'Invalid end date format'
          });
        }
        
        if (end <= start) {
          return res.status(400).json({
            status: 'error',
            message: 'New end date must be after start date'
          });
        }
      }
      
      // Update licitation
      await licitation.update({
        title: title ?? licitation.title,
        description: description ?? licitation.description,
        startDate: startDate ?? licitation.startDate,
        endDate: endDate ?? licitation.endDate,
        isLowestPrice: isLowestPrice ?? licitation.isLowestPrice
      });
      
      return res.status(200).json({
        status: 'success',
        message: 'Licitation updated successfully',
        data: licitation
      });
    } catch (error) {
      console.error(`Error updating licitation with ID ${req.params?.id}:`, error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to update licitation',
        error: error.message
      });
    }
  },

  /**
   * Delete a licitation
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   */
  deleteLicitation: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id; // Get user ID from auth middleware
      
      // Find licitation
      const licitation = await Licitation.findByPk(id);
      
      if (!licitation) {
        return res.status(404).json({
          status: 'error',
          message: `Licitation with ID ${id} not found`
        });
      }
      
      // Check if user is authorized to delete this licitation
      if (licitation.userId !== userId && !req.user?.isAdmin) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to delete this licitation'
        });
      }
      
      // Delete licitation
      await licitation.destroy();
      
      return res.status(200).json({
        status: 'success',
        message: 'Licitation deleted successfully'
      });
    } catch (error) {
      console.error(`Error deleting licitation with ID ${req.params?.id}:`, error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to delete licitation',
        error: error.message
      });
    }
  }
};

module.exports = licitationController;