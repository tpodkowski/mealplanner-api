# DEVELOPMENT
FROM node:latest As development

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

RUN yarn run build
RUN npx prisma generate

# PRODUCTION
FROM node:latest AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . .

RUN yarn run build
RUN npx prisma generate

EXPOSE 3000
CMD [ "yarn", "run", "start:prod" ]