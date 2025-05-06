# Strix Backend

A Node.js Express backend application for Strix.

## Features

- User authentication with JWT tokens and role-based access control
- Admin user functionality with the first registered user becoming admin
- Hello World API endpoint: Returns a simple greeting message
- Swagger API documentation: Interactive API documentation
- Automated deployment workflow via GitHub Actions
- Build system with Babel for modern JavaScript
- Dynamic Swagger configuration that adapts to deployment environment
- PostgreSQL database integration with automatic migrations
- Environment variable configuration
- Licitations management: Create, read, update, and delete licitations with customizable price type selection

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (v12 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/CleanCodeIt/strix-backend.git

# Navigate to the project directory
cd strix-backend

# Install dependencies
npm install

# Set up environment variables
# Copy the .env.example file to .env and update with your values
copy .env.example .env
```

### Database Setup

1. Create a PostgreSQL database for the project
2. Update the .env file with your database credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=strix_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_DIALECT=postgres
```

### Running the Application

```bash
# Build the application
npm run build

# Start in production mode
npm start

# Start in development mode (with auto-reload)
npm run dev

# Lint your code
npm run lint
```

The server will be available at: http://localhost:3000

### Database Commands

```bash
# Create a new migration (replace migration_name with your migration name)
npm run migrate migration_name

# Reset and run all migrations
npm run migrate:reset

# Seed the database with sample data
npm run seed

# Reset and run all seeders
npm run seed:reset
```

## Automatic Migrations

The application automatically runs pending migrations on startup. This ensures that your database schema is always up-to-date with the latest changes.

## API Documentation

Swagger API documentation is available at: 
- Development: http://localhost:3000/api-docs
- Production: {deployedServerURL}/api-docs

The Swagger UI automatically detects the correct server URL based on the environment.

### Available Endpoints

#### Authentication

- **Register User**
  - **URL**: `/api/auth/register`
  - **Method**: `POST`
  - **Description**: Register a new user (first user becomes admin)
  - **Request Body**:
    ```json
    {
      "username": "johndoe",
      "email": "john.doe@example.com",
      "password": "securePassword123"
    }
    ```
  - **Response (Success)**:
    ```json
    {
      "status": "success",
      "message": "User registered successfully",
      "token": "jwt-token-here",
      "user": {
        "id": 1,
        "username": "johndoe",
        "email": "john.doe@example.com",
        "isAdmin": true
      }
    }
    ```

- **Login User**
  - **URL**: `/api/auth/login`
  - **Method**: `POST`
  - **Description**: Authenticate a user and get JWT token
  - **Request Body**:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "securePassword123"
    }
    ```
  - **Response (Success)**:
    ```json
    {
      "status": "success",
      "message": "Login successful",
      "token": "jwt-token-here",
      "user": {
        "id": 1,
        "username": "johndoe",
        "email": "john.doe@example.com",
        "isAdmin": true
      }
    }
    ```

- **Get Current User**
  - **URL**: `/api/auth/me`
  - **Method**: `GET`
  - **Description**: Get information about the currently authenticated user
  - **Headers**: 
    ```
    Authorization: Bearer jwt-token-here
    ```
  - **Response (Success)**:
    ```json
    {
      "status": "success",
      "user": {
        "id": 1,
        "username": "johndoe",
        "email": "john.doe@example.com",
        "isAdmin": true
      }
    }
    ```

#### Licitations

- **Get All Licitations**
  - **URL**: `/api/licitations`
  - **Method**: `GET`
  - **Description**: Get a list of all licitations
  - **Response (Success)**:
    ```json
    {
      "status": "success",
      "data": [
        {
          "id": 1,
          "title": "Office Supplies",
          "description": "Looking for office supplies for our company",
          "startDate": "2025-05-10T10:00:00.000Z",
          "endDate": "2025-05-20T10:00:00.000Z",
          "isLowestPrice": true,
          "userId": 1,
          "createdAt": "2025-05-06T12:30:45.000Z",
          "updatedAt": "2025-05-06T12:30:45.000Z",
          "creator": {
            "id": 1,
            "username": "johndoe",
            "email": "john.doe@example.com"
          }
        }
      ]
    }
    ```

- **Get Licitation by ID**
  - **URL**: `/api/licitations/:id`
  - **Method**: `GET`
  - **Description**: Get details of a specific licitation
  - **Response (Success)**:
    ```json
    {
      "status": "success",
      "data": {
        "id": 1,
        "title": "Office Supplies",
        "description": "Looking for office supplies for our company",
        "startDate": "2025-05-10T10:00:00.000Z",
        "endDate": "2025-05-20T10:00:00.000Z",
        "isLowestPrice": true,
        "userId": 1,
        "createdAt": "2025-05-06T12:30:45.000Z",
        "updatedAt": "2025-05-06T12:30:45.000Z",
        "creator": {
          "id": 1,
          "username": "johndoe",
          "email": "john.doe@example.com"
        }
      }
    }
    ```

- **Create Licitation**
  - **URL**: `/api/licitations`
  - **Method**: `POST`
  - **Description**: Create a new licitation
  - **Authentication**: Required
  - **Request Body**:
    ```json
    {
      "title": "Office Supplies",
      "description": "Looking for office supplies for our company",
      "startDate": "2025-05-10T10:00:00.000Z",
      "endDate": "2025-05-20T10:00:00.000Z",
      "isLowestPrice": true
    }
    ```
  - **Response (Success)**:
    ```json
    {
      "status": "success",
      "message": "Licitation created successfully",
      "data": {
        "id": 1,
        "title": "Office Supplies",
        "description": "Looking for office supplies for our company",
        "startDate": "2025-05-10T10:00:00.000Z",
        "endDate": "2025-05-20T10:00:00.000Z",
        "isLowestPrice": true,
        "userId": 1,
        "createdAt": "2025-05-06T12:30:45.000Z",
        "updatedAt": "2025-05-06T12:30:45.000Z"
      }
    }
    ```

- **Update Licitation**
  - **URL**: `/api/licitations/:id`
  - **Method**: `PUT`
  - **Description**: Update an existing licitation
  - **Authentication**: Required
  - **Request Body**:
    ```json
    {
      "title": "Updated Office Supplies",
      "description": "Updated description for office supplies",
      "startDate": "2025-05-12T10:00:00.000Z",
      "endDate": "2025-05-25T10:00:00.000Z",
      "isLowestPrice": false
    }
    ```
  - **Response (Success)**:
    ```json
    {
      "status": "success",
      "message": "Licitation updated successfully",
      "data": {
        "id": 1,
        "title": "Updated Office Supplies",
        "description": "Updated description for office supplies",
        "startDate": "2025-05-12T10:00:00.000Z",
        "endDate": "2025-05-25T10:00:00.000Z",
        "isLowestPrice": false,
        "userId": 1,
        "createdAt": "2025-05-06T12:30:45.000Z",
        "updatedAt": "2025-05-06T13:45:22.000Z"
      }
    }
    ```

- **Delete Licitation**
  - **URL**: `/api/licitations/:id`
  - **Method**: `DELETE`
  - **Description**: Delete an existing licitation
  - **Authentication**: Required
  - **Response (Success)**:
    ```json
    {
      "status": "success",
      "message": "Licitation deleted successfully"
    }
    ```

#### Hello World

- **URL**: `/hello`
- **Method**: `GET`
- **Description**: Returns a Hello World message
- **Response**:
  ```json
  {
    "message": "Hello World!"
  }
  ```

#### Database Status

- **URL**: `/db-status`
- **Method**: `GET`
- **Description**: Checks the database connection status
- **Response (Success)**:
  ```json
  {
    "status": "success",
    "message": "Database connection established successfully"
  }
  ```
- **Response (Error)**:
  ```json
  {
    "status": "error",
    "message": "Failed to connect to database"
  }
  ```

## Deployment

The project includes a GitHub Actions workflow for automated deployment. The deployment process is triggered when a commit message follows this specific format:

```
DEPLOY {version}: {commitMessage}
```

For example: `DEPLOY 1.2.0: Added user authentication feature`

### Deployment Process

When a properly formatted commit message is pushed to the main branch, the following steps are automatically executed:

1. The project is built
2. The build is deployed to the configured FTP server
3. A GitHub release is created with:
   - A tag matching the specified version
   - Release notes from the releaseNotes.txt file
   - The built project attached as an artifact

### Configuration

To use the deployment workflow, configure the following GitHub repository secrets:

- `FTP_SERVER`: FTP server address
- `FTP_PORT`: FTP server port
- `FTP_USERNAME`: FTP account username
- `FTP_PASSWORD`: FTP account password
- `FTP_FOLDER_LOCATION`: Target directory on the FTP server

## Development Guidelines

- Don't use TypeScript
- Follow functional programming principles where possible
- Prefer immutable data
- Use try/catch blocks for async operations
- Document all endpoints in Swagger

## Build System

The project uses a modern build system with the following features:

- **Babel**: Transpiles modern JavaScript to ensure compatibility
- **ESLint**: Enforces code quality and styling standards
- **Build Script**: Compiles the source code to the `dist` directory
- **Development Mode**: Uses nodemon for automatic reloading during development

### Build Process

1. Run `npm run build` to create a production build
2. The build process:
   - Cleans the previous build (`dist` directory)
   - Transpiles JavaScript with Babel
   - Copies necessary files to the `dist` directory
   - Ignores development files like tests and GitHub workflows