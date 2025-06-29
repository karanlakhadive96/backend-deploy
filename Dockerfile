FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV MONGO_DB_URL=mongodb://mongodbcontainer:27017/simpleapp

ENTRYPOINT [ "node" ]

CMD [ "app.js" ]