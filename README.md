# Strix Backend

A Node.js Express backend application for Strix.

## Features

- Hello World API endpoint: Returns a simple greeting message
- Swagger API documentation: Interactive API documentation
- Automated deployment workflow via GitHub Actions
- Build system with Babel for modern JavaScript
- Dynamic Swagger configuration that adapts to deployment environment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/CleanCodeIt/strix-backend.git

# Navigate to the project directory
cd strix-backend

# Install dependencies
npm install
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

## API Documentation

Swagger API documentation is available at: 
- Development: http://localhost:3000/api-docs
- Production: {deployedServerURL}/api-docs

The Swagger UI automatically detects the correct server URL based on the environment.

### Available Endpoints

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