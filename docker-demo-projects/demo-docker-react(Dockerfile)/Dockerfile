# Use the official Node.js image as the base image
FROM node:13.12.0-alpine

# Set working directory
WORKDIR /usr/src/myapp

# Add /usr/src/myapp/node_modules/.bin to $PATH
ENV PATH /usr/src/myapp/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./

# Install app dependencies
RUN npm install --silent

# Install react-scripts globally
RUN npm install react-scripts@5.0.1 -g --silent

# Copy the entire application code into the image
COPY . ./

# Start app
CMD ["npm", "start"]
