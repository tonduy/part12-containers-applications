FROM node:16 AS build-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build


FROM nginx

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
