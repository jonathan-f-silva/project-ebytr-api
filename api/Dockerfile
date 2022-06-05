FROM node:16-alpine AS base
EXPOSE 3001
WORKDIR /app
COPY package.json yarn.lock ./

FROM base AS development
RUN yarn
COPY . .
CMD yarn dev

FROM base AS builder
# install all deps, build, then remove dev deps and cache
RUN yarn && yarn build && yarn --production && rm -rf /usr/local/share/.cache/*
COPY . .
CMD yarn start
