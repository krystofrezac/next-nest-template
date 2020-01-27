FROM node:12.14

RUN mkdir /app
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
COPY ./api /app/api
COPY ./shared /app/shared

RUN yarn

EXPOSE 4000

WORKDIR /app/api

CMD ["yarn","build"]