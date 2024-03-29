# FROM node:lts AS dist
# COPY package.json yarn.lock ./

# RUN yarn install

# COPY . ./

# RUN yarn build:prod

# FROM node:lts AS node_modules
# COPY package.json yarn.lock ./

# RUN yarn install --prod

# FROM node:lts

# ARG PORT=3000

# RUN mkdir -p /usr/src/app

# WORKDIR /usr/src/app

# COPY --from=dist dist /usr/src/app/dist
# COPY --from=node_modules node_modules /usr/src/app/node_modules

# COPY . /usr/src/app

# EXPOSE $PORT

# CMD [ "yarn", "start:prod" ]

# v2

FROM node:16.19.0-slim

WORKDIR /app

COPY package.json yarn.lock .env .

RUN yarn

COPY . ./

RUN yarn build:prod

ENV PORT 3000

EXPOSE $PORT

CMD [ "yarn", "start:prod" ]