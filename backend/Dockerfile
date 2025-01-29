FROM amazoncorretto:17-alpine-jdk
WORKDIR /var/www
RUN apk update
RUN apk add --no-cache bash curl jq wget
RUN apk add maven
COPY ./ ./
RUN mvn clean package
EXPOSE 8080
ENTRYPOINT  [ "mvn" ,"exec:java","-Dexec.mainClass=com.oussama.App"]
