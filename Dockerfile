FROM node:16-alpine AS base
EXPOSE 3001
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm install && rm -rf /usr/local/share/.cache/* /root/.npm
COPY . .
RUN chown -R 1000:1000 /app
USER 1000
CMD npm run dev

FROM base AS production
# install all deps, build, then remove dev deps and cache
COPY . .
RUN npm install && npm run build && npm prune --omit=dev && rm -rf /usr/local/share/.cache/* /root/.npm
RUN chown -R 1000:1000 /app
USER 1000
CMD npm start
