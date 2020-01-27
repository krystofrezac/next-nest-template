FROM node:12.14

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn

EXPOSE 4000

WORKDIR /app/api

CMD ["yarn","dev"]