FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
COPY shared/package*.json ./shared/
COPY api/package*.json ./api/

RUN npm install

COPY shared/ ./shared/
COPY api/ ./api/

WORKDIR /app/api
EXPOSE 5000
CMD ["npm", "run", "dev"]