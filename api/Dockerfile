FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY api/package*.json ./api/
RUN npm install

FROM base AS development
COPY shared/ ./shared/
COPY api/ ./api/
RUN npm run build --workspace=api

FROM node:20-alpine AS production
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/shared/package*.json ./shared/
COPY --from=builder /app/api/package*.json ./api/

RUN npm install --omit=dev

COPY --from=builder /app/api/dist/shared/ /app/shared/

COPY --from=builder /app/api/dist/api/src/ /app/api/dist/

WORKDIR /app/api

EXPOSE 5005

CMD ["node", "dist/index.js"]