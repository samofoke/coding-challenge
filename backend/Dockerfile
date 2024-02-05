# Use an official Node runtime as a parent image
FROM node:18.19-alpine

# Set theworking directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependecies
RUN if [ "$NODE_ENV" = "production"]; \
    then npm install --only=production; \
    else npm install; \
    fi

# Copy source code
COPY . .

# Expose the port
EXPOSE 5003

# define the command to run the app
CMD if [ "$NODE_ENV" = "production" ]; \
    then npm run start; \
    else npm run dev; \
    fi