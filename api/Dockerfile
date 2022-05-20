FROM node:16-alpine

EXPOSE 3001

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

CMD [ "yarn", "start" ]
