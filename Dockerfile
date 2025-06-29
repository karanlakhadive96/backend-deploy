FROM node:alpine
ARG MONGO_DB_URL

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV MONGO_DB_URL=${MONGO_DB_URL}

ENTRYPOINT [ "node" ]

CMD [ "app.js" ]