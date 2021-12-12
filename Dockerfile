FROM node:16.13-alpine3.12

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli@8.1.5

USER node

WORKDIR /home/node/app