FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production


FROM node:20-alpine

WORKDIR /app

RUN npm install -g http-server && apk add --no-cache openssl

COPY --from=build /app/dist /app/dist

RUN mkdir -p /app/ssl && \
    openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 \
    -keyout /app/ssl/key.pem \
    -out /app/ssl/cert.pem \
    -subj "/CN=localhost"

EXPOSE 8080 8443

CMD ["sh", "-c", "http-server /app/dist -p 8080"]