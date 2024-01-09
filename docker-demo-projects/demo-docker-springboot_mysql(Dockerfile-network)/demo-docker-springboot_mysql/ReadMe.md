### Reference Documentation

### Steps to Dockerize the Spring Boot Application with MySQL database 

Step 1: 
Pull the mysql image from docker hub

	docker pull mysql:5.7
	docker pull --platform linux/x86_64 mysql:5.7
	
Step 2:
Create a docker network(bridge) to communicate Spring boot app and Mysql database.

	docker network create springboot-mysql-net
	docker network ls
	
Step 3:
Run the mysql container in the network

	docker run --name mysqldb --network springboot-mysql-net -e MYSQL_ROOT_PASSWORD=Ks_@961796 -e MYSQL_DATABASE=userdb -e MYSQL_USER=hitman -e MYSQL_PASSWORD=Ks_@961796 -d mysql:5.7
	
	              or
	              
	docker run --name mysqldb --network springboot-mysql-net -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=user_db -d mysql:5.7
	              
Step 4:
Check the create database

	docker exec -it <container-id> bash 
	mysql -u<username> -p<password> 
	show databases;
	
Step 5:
Update the application.properties file
	
	#spring.datasource.url=jdbc:mysql://<container_name>:3306/user_db
	
	spring.datasource.url=jdbc:mysql://mysqldb:3306/userdb
	spring.datasource.username=hitman
	spring.datasource.password=Ks_@961796

Step 6:
Build the spring boot docker image

	docker build -t springbootmysql .
	
Step 7:
Start the spring boot container on the same network

	docker run --network springboot-mysql-net --name springboot-container -p 8080:8080 springbootmysql
	


