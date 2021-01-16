FROM node:alpine

WORKDIR /usr/app

COPY package.json ./
COPY index.js ./

RUN npm install 

RUN cat package.json

RUN npm start

EXPOSE 3000

# CMD npm start