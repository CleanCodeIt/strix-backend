/**
 * Main server application file
 * Strix Backend Application
 */

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');
const { runMigrations } = require('./config/migrations');

// Import routes
const authRoutes = require('./routes/auth');
const licitationRoutes = require('./routes/licitations');

// Constants
const PORT = process.env.PORT ?? 3000;
const HOST = process.env.HOST ?? 'localhost';
const NODE_ENV = process.env.NODE_ENV ?? 'development';

// Initialize Express app
const app = express();

// Enable CORS for all requests
app.use(cors());

// Add JSON body parser middleware
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/licitations', licitationRoutes);

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
        url: NODE_ENV === 'production' 
          ? '{serverUrl}' // This will be replaced with the actual URL by Swagger UI
          : `http://${HOST}:${PORT}`,
        description: NODE_ENV === 'production' ? 'Production server' : 'Development server',
        variables: {
          serverUrl: {
            default: NODE_ENV === 'production' ? '' : `http://${HOST}:${PORT}`,
            description: 'The server URL'
          }
        }
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./index.js', './routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  swaggerOptions: {
    serverSelector: true,
  }
}));

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

/**
 * @swagger
 * /db-status:
 *   get:
 *     summary: Check database connection status
 *     description: Verifies if the application can connect to the database
 *     responses:
 *       200:
 *         description: Database connection successful
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
 *                   example: Database connection established successfully
 *       500:
 *         description: Database connection failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Failed to connect to database
 */
app.get('/db-status', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ 
      status: 'success', 
      message: 'Database connection established successfully' 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to connect to database' 
    });
  }
});

// Start the server
const startServer = async () => {
  try {
    // Connect to the database
    console.log('Connecting to the database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Run migrations
    console.log('Running database migrations...');
    await runMigrations();

    // Start the Express server
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