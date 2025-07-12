FROM node AS build-stage

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

####### Final Image #######

FROM node:alpine

WORKDIR /app

COPY --from=build-stage /app /app

ENTRYPOINT [ "node" ]

CMD [ "app.js" ]