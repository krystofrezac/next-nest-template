FROM node:12.14

RUN mkdir /app
WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./app /app/app
COPY ./shared /app/shared

RUN yarn

WORKDIR /app/app

CMD ["yarn","dev"]