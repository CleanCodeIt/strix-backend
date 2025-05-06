'use strict';

const express = require('express');
const router = express.Router();
const licitationController = require('../controllers/licitationController');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Licitation:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - startDate
 *         - endDate
 *       properties:
 *         id:
 *           type: integer
 *           description: The licitation ID
 *         title:
 *           type: string
 *           description: The licitation title
 *         description:
 *           type: string
 *           description: The licitation description
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The starting date of the licitation
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The ending date of the licitation
 *         isLowestPrice:
 *           type: boolean
 *           description: Indicates if looking for lowest price (true) or highest price (false)
 *         userId:
 *           type: integer
 *           description: ID of the user who created the licitation
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp
 *     
 *     LicitationInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - startDate
 *         - endDate
 *       properties:
 *         title:
 *           type: string
 *           description: The licitation title
 *         description:
 *           type: string
 *           description: The licitation description
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The starting date of the licitation
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The ending date of the licitation
 *         isLowestPrice:
 *           type: boolean
 *           description: Indicates if looking for lowest price (true) or highest price (false)
 *           default: true
 * 
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *           example: Error message
 */

/**
 * @swagger
 * /api/licitations:
 *   get:
 *     summary: Get all licitations
 *     description: Retrieve a list of all licitations
 *     tags: [Licitations]
 *     responses:
 *       200:
 *         description: A list of licitations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Licitation'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', licitationController.getAllLicitations);

/**
 * @swagger
 * /api/licitations/{id}:
 *   get:
 *     summary: Get licitation by ID
 *     description: Retrieve a specific licitation by its ID
 *     tags: [Licitations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The licitation ID
 *     responses:
 *       200:
 *         description: Licitation data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Licitation'
 *       404:
 *         description: Licitation not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', licitationController.getLicitationById);

/**
 * @swagger
 * /api/licitations:
 *   post:
 *     summary: Create a new licitation
 *     description: Create a new licitation with the provided data
 *     tags: [Licitations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LicitationInput'
 *     responses:
 *       201:
 *         description: Licitation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Licitation created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Licitation'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - valid authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authenticateToken, licitationController.createLicitation);

/**
 * @swagger
 * /api/licitations/{id}:
 *   put:
 *     summary: Update a licitation
 *     description: Update a specific licitation by its ID
 *     tags: [Licitations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The licitation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LicitationInput'
 *     responses:
 *       200:
 *         description: Licitation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Licitation updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Licitation'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - valid authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - user does not have permission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Licitation not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', authenticateToken, licitationController.updateLicitation);

/**
 * @swagger
 * /api/licitations/{id}:
 *   delete:
 *     summary: Delete a licitation
 *     description: Delete a specific licitation by its ID
 *     tags: [Licitations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The licitation ID
 *     responses:
 *       200:
 *         description: Licitation deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Licitation deleted successfully
 *       401:
 *         description: Unauthorized - valid authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - user does not have permission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Licitation not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authenticateToken, licitationController.deleteLicitation);

module.exports = router;