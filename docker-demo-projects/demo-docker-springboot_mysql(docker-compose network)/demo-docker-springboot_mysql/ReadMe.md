### Steps to Dockerize the Spring Boot App with MySQL DB using network 

Stop containers

	docker stop <container_id>
	docker rm <container_id>
	
Remove Images

	docker rmi <image_id>
Check Logs

	docker logs <container_id>	

#Using Dockerfile

Step 1:
Create jar

	mvn clean install -DskipTests
	mvn clean package -DskiptTests
	
Step 2:
Create Dockerfile

	FROM openjdk:11
	LABEL maintainers = "Kranthi Kumar"  
	WORKDIR /usr/src/myapp
	#COPY target/demo-springboot-0.0.1-SNAPSHOT.jar /usr/src/myapp/
	#ENTRYPOINT ["java", "-jar","demo-springboot-0.0.1-SNAPSHOT.jar"]
	COPY target/demo-docker-springboot_mysql-0.0.1-SNAPSHOT.jar  demo-springboot-app.jar
	ENTRYPOINT ["java", "-jar","demo-springboot-app.jar"]
	EXPOSE 8080

Step 3: 
Pull the mysql image from docker hub

	docker pull mysql:5.7
	docker pull --platform linux/x86_64 mysql:5.7
	
Step 4:
Create a docker network(bridge) to communicate Spring boot app and Mysql database.

	docker network create springboot-mysql-net
	docker network ls
	
Step 5:
Run the mysql container in the network

	docker run --name mysqldb --network springboot-mysql-net -e MYSQL_ROOT_PASSWORD=Ks_@961796 -e MYSQL_DATABASE=userdb -e MYSQL_USER=hitman -e MYSQL_PASSWORD=Ks_@961796 -d mysql:5.7
	
	              or
	              
	docker run --name mysqldb --network springboot-mysql-net -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=user_db -d mysql:5.7
	              
Step 6:
Check the create database

	docker exec -it <container-id> bash 
	mysql -u<username> -p<password> 
	show databases;
	
Step 7:
Update the application.properties file
	
	#spring.datasource.url=jdbc:mysql://<container_name>:3306/user_db
	
	spring.datasource.url=jdbc:mysql://mysqldb:3306/userdb
	spring.datasource.username=hitman
	spring.datasource.password=Ks_@961796

Step 8:
Build the spring boot docker image

	docker build -t springbootmysql .
	
Step 9:
Start the spring boot container on the same network

	docker run --network springboot-mysql-net --name springboot-container -p 8080:8080 springbootmysql
	
Step 10:
check container logs(to check service is started)

	docker logs <container_name>	

#Using docker-compose.yml & Dockerfile

Step 1:
Create jar

	mvn clean install -DskipTests
	mvn clean package -DskiptTests
	
Step 2:
Create Dockerfile

	FROM openjdk:11
	LABEL maintainers = "Kranthi Kumar"  
	WORKDIR /usr/src/myapp
	#COPY target/demo-springboot-0.0.1-SNAPSHOT.jar /usr/src/myapp/
	#ENTRYPOINT ["java", "-jar","demo-springboot-0.0.1-SNAPSHOT.jar"]
	COPY target/demo-docker-springboot_mysql-0.0.1-SNAPSHOT.jar  demo-springboot-app.jar
	ENTRYPOINT ["java", "-jar","demo-springboot-app.jar"]
	EXPOSE 8080

Step 3:
docker-compose.yml
	
	version: '3'
	services:
	  mysqldb:
    	image: mysql:5.7
    	container_name: mysqldb
    	networks:
      	  - springboot-mysql-net
    	environment:
      	  MYSQL_ROOT_PASSWORD: root
     	  MYSQL_DATABASE: userdb
      	  MYSQL_USER: hitman
      	  MYSQL_PASSWORD: Ks_@961796
    	#ports:
      	  #- "3306:3306"
    	#volumes:
      	  #- mysqldata:/var/lib/mysql

	  springboot-app:
        build:
          context: .
          dockerfile: Dockerfile
        image: springbootmysql
        container_name: springboot-container
        networks:
          - springboot-mysql-net
        depends_on:
          - mysqldb
        ports:
          - "8080:8080"

	networks:
      springboot-mysql-net:
        driver: bridge

	#volumes:
	  #mysqldata:
	
Step 4:
check existing with same images/container is running any if required stop	

	docker images
	docker rmi <img_id>
	docker ps / docker ps -a
	docker stop <cont_id>
	docker rm <cont_id>
	
Step 5:
To start service & stop cmnds

	docker-compose up -d
	docker-compose down	

	
	
# Kill/Remove Mysql Listing ports

	netstat -an | findstr "3306"
	tasklist
	netstat -an | findstr "LISTENING" | findstr ":3306"
	tasklist /FI "IMAGENAME eq mysqld.exe"
	
	#open cmd as adminstrator enter below cmnds
	 taskkill /F /PID <PID>
	 taskkill /F /PID 4472
		


