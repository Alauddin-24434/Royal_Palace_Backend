# Use official Node.js 18 alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build TypeScript project
RUN npm run build

# Expose app port
EXPOSE 5000

# Start app
CMD ["npm", "run", "start"]
