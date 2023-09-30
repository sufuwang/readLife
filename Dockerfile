# FROM node:latest as build-stage

# WORKDIR /app

# COPY . .

# RUN npm install

# RUN npm run build

FROM nginx:latest as product-stage

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist /usr/share/nginx/html/

EXPOSE 3000
