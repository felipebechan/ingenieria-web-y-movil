# Imagen del backend: Express conectado a PostgreSQL
FROM node:22-alpine

WORKDIR /app

# Primero las dependencias, asi Docker reutiliza esta capa si solo cambia el codigo
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src
COPY sql ./sql

EXPOSE 3000

CMD ["node", "src/server.js"]
