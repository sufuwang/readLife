FROM node:latest as install-stage
WORKDIR /app
COPY ./package.json .
RUN npm install

FROM node:latest as build-stage
WORKDIR /app
COPY . .
COPY --from=install-stage /app/node_modules /app/node_modules
RUN npm install
RUN npm run build

FROM nginx:latest as product-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html/
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
