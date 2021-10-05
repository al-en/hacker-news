FROM node:14 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

FROM nginx:1.21.3-alpine

COPY --from=build-step /app/dist/hacker-news /usr/share/nginx/html