# coding-challenge
## Prerequisites
 - you need docker installed and node.js 18xx.
 - in case you going to run docker-compose up --build to build the project.

## Installation
Explain how to set up the local development environment.

### Backend
1. Navigate to the `backend` directory.
2. Run `npm install` to install dependencies.
3. Set environment variables in a `.env` file based on the provided example.
4, for jwt secret key I used openssl rand -base64 32 to generate the key.

### Frontend
1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.

### With Docker
1. Ensure Docker is installed and running.
2. From the project root, run `docker-compose up --build`.

### Without Docker Backend
- Run `npm start` inside the `backend` directory.

#### Frontend
- Run `npm start` inside the `frontend` directory.

## API Endpoints
List the main API endpoints if your backend exposes an API.

## Environment Variables
Detail the environment variables needed for the project.

- `NODE_ENV`: Environment mode (e.g., development, production).
- `PORT`: Server port (default: 5003).
- `JWT_SECRET`: Secret key for JWT.
- `MONGO_DB`: MongoDB URI.
- `REACT_APP_API_URL`: URL for the React app to connect to the API.