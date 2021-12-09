FROM node:16

ENV GIPHY_TOKEN=false
ENV DISCORD_BOT_TOKEN=false

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 8080

CMD [ "npm", "start"]