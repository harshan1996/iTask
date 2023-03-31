# Step #1: Build the React front end
FROM node:alpine3.16 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

# Step #2: Build an nginx container
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/build .

ENTRYPOINT [ "nginx","-g","daemon off;" ]
