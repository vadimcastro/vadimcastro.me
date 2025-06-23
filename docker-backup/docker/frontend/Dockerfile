# docker/frontend/Dockerfile
FROM node:18-alpine
WORKDIR /app

# Copy package files from frontend directory
# The context is set to the project root in docker-compose.yml,
# so paths should be relative to project root
COPY frontend/package.json frontend/package-lock.json ./

# Install npm packages
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ .

# Set environment variables
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]