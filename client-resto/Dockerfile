# Use Node.js image for development
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose Vite's default port
EXPOSE 4200

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
