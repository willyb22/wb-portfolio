# Use the official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

RUN npm install -g nodemon

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files into the container
COPY . .

# Start the application
# CMD ["npm", "start"]
CMD ["npm", "run", "dev:watch"]