FROM node:12.14

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn

WORKDIR /app/api

CMD ["yarn","dev"]