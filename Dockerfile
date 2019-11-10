# develop stage
FROM node:13.0-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .
# build stage
FROM develop-stage as build-stage
RUN yarn build
# production stage
FROM nginx:1.17.5-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;", "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf"]