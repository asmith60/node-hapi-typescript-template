FROM node:8.5.0-alpine

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install --production

COPY dist dist

ENTRYPOINT ["npm", "start"]
