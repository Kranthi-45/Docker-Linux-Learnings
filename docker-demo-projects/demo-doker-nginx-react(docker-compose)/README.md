# Dockerize react-app using Dockerfile

Stop containers

	docker stop <container_id>
	docker rm <container_id>
	
Remove Images

	docker rmi <image_id>

Check Logs

	docker logs <container_id>
    docker logs <container_id> -f
    docker logs <container_id> --tail 100 -f

	
Restart stopped container
    
    docker restart <container_id>

## Using Dockerfile

Step 1:
Create Dockerfile

    #-------------node block---------------

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

    #------nginx block--------------------
    FROM nginx:alpine

    # set working directory for nginx server
    WORKDIR /usr/share/nginx/html

    # remove all default nginx static assets/files
    RUN rm -rf ./*
  
    # copy build from above nodework to nginx path 
    COPY --from=nodework /usr/src/myapp/build .

    #to serve nginx
    EXPOSE 80
    ENTRYPOINT ["nginx","-g","daemon off;"]
    #CMD ["nginx","-g","daemon off;"]

Step 2:
Create .dockerignore file
    
    node_modules
    #build
    .dockerignore
    Dockerfile
    Dockerfile.prod

Step 3: 
Build Docker Image using Dockerfile

	docker build -t react-nginx-image .

Step 4:
Run Docker Container using Image

    docker run --name react-nginx-container -it -d -p 3000:80 react-nginx-image


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
      react-nginx-app:
        build:
          context: .
          dockerfile: Dockerfile
        image: react-nginx-app:
        container_name: react-nginx-container
        ports:
          - "3000:80"
        #expose:
          #- "3000"  
        #volumes:
          #- ./src:/usr/src/myapp/src
          #- ./public:/usr/src/myapp/public
        #environment:
          #- NODE_ENV=development
        #command: npm start

Step 3:
To Up & Down compose file

    docker-compose up -d
    docker-compose down
             or
    docker build         