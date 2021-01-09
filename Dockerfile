FROM node:14.15.4 AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . .

RUN yarn run build
RUN npx prisma generate

EXPOSE 3000
CMD [ "yarn", "run", "start:prod" ]