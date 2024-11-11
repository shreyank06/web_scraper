# Use the official Node.js 14 image as the base image
FROM node:14

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port (not strictly necessary here, but helpful if you want to expose a web server later)
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
