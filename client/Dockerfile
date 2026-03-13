# --- Étape 1 : Build ---
FROM node:20-alpine AS builder

ARG PUBLIC_API_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV PUBLIC_API_URL=$PUBLIC_API_URL

RUN npm run build

# --- Étape 2 : Run ---
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

RUN npm install --omit=dev 

ENV NODE_ENV=production
ENV PORT=3000

ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL

EXPOSE 3000
CMD ["node", "build"]