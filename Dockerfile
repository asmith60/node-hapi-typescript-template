FROM node:9.11-alpine

RUN apk update && apk add python make

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY dist dist

EXPOSE 8000

ENTRYPOINT ["npm"]

CMD ["start"]
