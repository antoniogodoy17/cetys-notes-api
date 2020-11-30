FROM node:12.18.3-buster

WORKDIR /app

COPY . .

RUN npm i

CMD ["node", "server.js"]