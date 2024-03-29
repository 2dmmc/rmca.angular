ARG BASE_IMAGE=node:8-buster-slim
FROM $BASE_IMAGE AS build

RUN apt-get update && apt-get install build-essential python -y

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src  ./src
COPY *.json *.js ./
RUN npm run build:prod

FROM nginx AS release

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
