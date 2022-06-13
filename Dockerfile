FROM node:16-alpine AS base
EXPOSE 3001
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm install && rm -rf /usr/local/share/.cache/*
COPY . .
CMD npm run dev

FROM base AS production
# install all deps, build, then remove dev deps and cache
COPY . .
RUN npm install && npm run build && npm prune --omit=dev && rm -rf /usr/local/share/.cache/*
CMD npm start
