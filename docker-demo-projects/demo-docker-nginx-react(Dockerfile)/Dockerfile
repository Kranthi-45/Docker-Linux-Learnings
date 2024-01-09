#------------------Production-------------------

#-------------------------------------------------node block------------------
# Use the official Node.js image as base
FROM node:13.12.0-alpine as nodework

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

# create production build code 
RUN npm run build

# Start app
#CMD ["npm", "start"]

#----------------------------------------------nginx block--------------------
FROM nginx:alpine

# set working directory for nginx server
WORKDIR /usr/share/nginx/html

# remove all default nginx static assets/files
RUN rm -rf ./*

# copy build from above image nodework to nginx path 
COPY --from=nodework /usr/src/myapp/build .

#to serve nginx
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
#CMD ["nginx","-g","daemon off;"]

