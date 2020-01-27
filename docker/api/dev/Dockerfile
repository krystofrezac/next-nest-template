FROM node:12.14

RUN mkdir /app
WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./api api
COPY ./shared shared


RUN yarn

WORKDIR /app/api

CMD ["yarn","dev"]