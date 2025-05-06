/**
 * Main server application file
 * Strix Backend Application
 */

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');

// Constants
const PORT = process.env.PORT ?? 3000;
const HOST = process.env.HOST ?? 'localhost';

// Initialize Express app
const app = express();

// Enable CORS for all requests
app.use(cors());

// Add JSON body parser middleware
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Strix API',
      version: '1.0.0',
      description: 'Strix Backend API Documentation',
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}`,
      },
    ],
  },
  apis: ['./index.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Returns Hello World message
 *     description: A simple endpoint that returns a greeting message
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World!
 */
app.get('/hello', (req, res) => {
  try {
    res.status(200).json({ message: 'Hello World!' });
  } catch (error) {
    console.error('Error in hello route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running at http://${HOST}:${PORT}`);
      console.log(`Swagger documentation available at http://${HOST}:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();