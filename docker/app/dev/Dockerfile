FROM node:12.14

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn

EXPOSE 3000

WORKDIR /app/app

CMD ["yarn","start"]