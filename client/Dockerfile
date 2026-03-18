# --- STEP 1: Base (Dépendances communes) ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY client/package*.json ./client/
RUN npm install

# --- STEP 2: Development (Local avec Hot Reload) ---
FROM base AS development
COPY shared/ ./shared/
COPY client/ ./client/
WORKDIR /app/client
# Port par défaut de Vite
EXPOSE 5173 
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# --- STEP 3: Builder (Compilation SvelteKit) ---
FROM base AS builder
COPY shared/ ./shared/
COPY client/ ./client/
# On passe l'URL de l'API au moment du build car Vite l'incline dans le JS statique
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build --workspace=client

# --- STEP 4: Production (Image finale optimisée) ---
FROM node:20-alpine AS production
WORKDIR /app
# On récupère seulement le dossier 'build' généré par SvelteKit
COPY --from=builder /app/client/build ./build
COPY --from=builder /app/client/package.json ./package.json
# Install uniquement les dépendances nécessaires au serveur node
RUN npm install --omit=dev

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]