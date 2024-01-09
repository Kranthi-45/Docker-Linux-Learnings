FROM openjdk:17-jdk-alpine
LABEL maintainers = "Kranthi Kumar"  
WORKDIR /usr/src/myapp
COPY ./target/demo-springboot-0.0.1-SNAPSHOT.jar /usr/src/myapp/
# COPY ./target/demo-springboot-0.0.1-SNAPSHOT.jar  demo-springboot-app.jar
ENTRYPOINT ["java", "-jar","demo-springboot-0.0.1-SNAPSHOT.jar"]
EXPOSE 9595

#commands 
#docker build -t springboot-image .
#docker images
#docker run --name springBootProject -it -p 8080:9595 -d springboot-image
#docker stop springBootProject
#docker rm springBootProject

 #When using 
 # -the docker run command,correct order for port mapping is -p hostPort:containerPort.
 # -However,in docker-compose.yml file, the order is reversed, specifying containerPort:hostPort.
