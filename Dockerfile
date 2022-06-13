FROM node:16-alpine AS base
EXPOSE 3001
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm install && rm -rf /usr/local/share/.cache/*
COPY . .
CMD npm run dev

FROM base AS builder
# install all deps, build, then remove dev deps and cache
COPY . .
RUN npm install && npm run build && npm prune --production && rm -rf /usr/local/share/.cache/*
CMD npm start
