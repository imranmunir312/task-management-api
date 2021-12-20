FROM node:12.22.8-alpine3.14
WORKDIR /app
COPY package.json ./
RUN yarn
COPY . ./
RUN yarn run build
CMD ["yarn", "run", "start:prod"]