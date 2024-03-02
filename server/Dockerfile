# Use the official Node.js image as base
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 5000 (or any other port your backend listens to)
EXPOSE 5000

# Command to run the backend server
CMD ["npm", "start"]

# Run docker build -t backend-image ./server to build your Docker image for the backend.
# After building the image, you can run docker run -p 5000:5000 backend-image to start a container based on the image.
# Your backend application will be accessible at http://localhost:5000.