FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY client/package*.json ./client/
RUN npm install

FROM base AS development
COPY shared/ ./shared/
COPY client/ ./client/
WORKDIR /app/client

EXPOSE 5173 
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


FROM base AS builder
COPY shared/ ./shared/
COPY client/ ./client/

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build --workspace=client


FROM node:20-alpine AS production
WORKDIR /app

COPY --from=builder /app/client/build ./build
COPY --from=builder /app/client/package.json ./package.json

RUN npm install --omit=dev

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]