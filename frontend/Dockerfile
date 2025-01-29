FROM node:23-alpine3.20


WORKDIR /var/www
RUN apk update
COPY ./ ./
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 5173
ENTRYPOINT  ["serve","-s","dist","-l","5173"]
