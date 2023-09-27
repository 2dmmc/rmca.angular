ARG BASE_IMAGE=node:8-buster-slim
FROM $BASE_IMAGE AS build

RUN apt-get update && apt-get install build-essential python -y

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .
RUN npm run build:prod:aot

FROM nginx AS release

COPY --from=build /app/dist /var/html/www
