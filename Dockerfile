# Build
FROM node:lts-alpine AS build
WORKDIR /app

COPY server/package*.json ./server/
COPY client/package*.json ./client/

COPY . .

RUN ./install.sh

# Prod Deploy
FROM node:lts-alpine
WORKDIR /app

COPY --from=build /app/server/ ./server/
COPY --from=build /app/client/ ./client/
COPY --from=build /app/test/ ./test/

# Service calls are all internal to the container, so http://localhost should suffice for now
ENV SERVICE_REGISTRY_ENDPOINT="http://localhost:80"

WORKDIR /app/server

CMD ["node", "index.js"]
