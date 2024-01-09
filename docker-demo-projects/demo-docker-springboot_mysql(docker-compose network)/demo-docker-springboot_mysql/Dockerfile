FROM openjdk:11
LABEL maintainers = "Kranthi Kumar"  
WORKDIR /usr/src/myapp
# COPY target/demo-springboot-0.0.1-SNAPSHOT.jar /usr/src/myapp/
# ENTRYPOINT ["java", "-jar","demo-springboot-0.0.1-SNAPSHOT.jar"]
COPY target/demo-docker-springboot_mysql-0.0.1-SNAPSHOT.jar  demo-springboot-app.jar
ENTRYPOINT ["java", "-jar","demo-springboot-app.jar"]
EXPOSE 8080

#RUN javac Main.java
#CMD ["java", "Main"]