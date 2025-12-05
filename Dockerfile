# Build
FROM node:lts-alpine AS build
WORKDIR /app

COPY package*.json ./

COPY src/ ./src/

RUN npm install

# Deploy
FROM node:lts-alpine
WORKDIR /app

COPY --from=build /app/src/ ./src/
COPY --from=build /app/node_modules/ ./node_modules/

ENV YAMF_REGISTRY_URL="http://localhost:8000"
EXPOSE 8000

WORKDIR /app

CMD ["node", "src/server.js"]
