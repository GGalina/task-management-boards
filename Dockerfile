# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/

# Install dependencies
RUN cd backend && npm install

# Copy all backend source
COPY backend ./backend

# Copy .env file (optional — for local builds only)
# You can comment this out in CI/CD (Render injects env vars)
COPY backend/.env ./backend/.env


# Build TypeScript
RUN cd backend && npm run build

# Expose the backend port
EXPOSE 5000

# Start the app
CMD ["node", "backend/dist/src/server.js"]
