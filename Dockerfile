FROM node:16

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 3001

ARG var_name
ENV CONFIG_PASS=$var_name

RUN npm run decrypt:config

CMD [ "npm", "run", "server" ]
