FROM node:22-alpine3.20

WORKDIR /home/node

COPY . .

RUN npm install

EXPOSE 8000

CMD node index.js