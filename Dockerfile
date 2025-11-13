# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install --prefix backend

# Copy backend source code
COPY backend ./backend

# Build TypeScript
RUN npm run build --prefix backend

# Expose backend port
EXPOSE 5000

# Run the compiled JS file
CMD ["node", "backend/dist/server.js"]
