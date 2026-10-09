FROM node:22-alpine AS build

ARG BUILD_VERSION=3

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM scratch

ARG BUILD_VERSION=3

COPY --from=build /app/dist /