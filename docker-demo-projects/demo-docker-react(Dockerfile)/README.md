# Dockerize react-app using Dockerfile

Stop containers

	docker stop <container_id>
	docker rm <container_id>
	
Remove Images

	docker rmi <image_id>

Check Logs

	docker logs <container_id>	

Restart stopped container
    
    docker restart <container_id>

## Using Dockerfile

Step 1:
Create Dockerfile

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

    # Install react-scripts globally & same as package.json script version
    RUN npm install react-scripts@5.0.1 -g --silent

    # Copy the entire application code into the image
    COPY . ./

    # Start app
    CMD ["npm", "start"]

Step 2:
Create .dockerignore file
    
    node_modules
    build
    .dockerignore
    Dockerfile
    Dockerfile.prod

Step 3: 
Build Docker Image using Dockerfile

	docker build -t react-image:dev

	
Step 4:
Run Docker Container using Image

    docker run -it -p 3000:3000 react-image:dev

Step 5:
Check container logs for app is started or not

    docker logs <container_id>

Step 6:
check the sample localhost url

    http://localhost:3000/

## Using docker-compose.yml file

Step 1:
    follow above Dockerfile all steps

Step 2:
Create docker-compose.yml

    version: '3'
    services:
      react-app:
        build:
          context: .
          dockerfile: Dockerfile
        image: my-react-app
        container_name: react-app-container
        ports:
          - "3000:3000"
        volumes:
          - ./src:/usr/src/myapp/src
          - ./public:/usr/src/myapp/public
        environment:
          - NODE_ENV=development
        command: npm start

Step 3:
To Up & Down compose file

    docker-compose up -d
    docker-compose down