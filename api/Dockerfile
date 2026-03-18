# --- STEP 1: Base (Dépendances) ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY api/package*.json ./api/
RUN npm install

# --- STEP 2: Development (Pour le local) ---
FROM base AS development
COPY shared/ ./shared/
COPY api/ ./api/
WORKDIR /app/api
# Pas de build ici, on utilise ts-node-dev ou nodemon
CMD ["npm", "run", "dev"]

# --- STEP 3: Builder (Pour la prod) ---
FROM base AS builder
COPY shared/ ./shared/
COPY api/ ./api/
RUN npm run build --workspace=api

# --- STEP 4: Production (Image finale légère) ---
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/api/dist ./api/dist
RUN npm install --omit=dev
WORKDIR /app/api
CMD ["node", "dist/main.js"]