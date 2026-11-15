# Imagen del frontend. Se arma en dos etapas: primero se compila con node y
# despues solo el resultado se copia a nginx, asi la imagen final queda chica.

FROM node:22-alpine AS compilacion

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# La direccion de la API se mete al compilar, porque Vite la reemplaza en el
# codigo. VITE_BASE queda en la raiz porque aca no estamos en GitHub Pages.
ARG VITE_API_URL=http://localhost:3000/api
ARG VITE_BASE=/
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_BASE=$VITE_BASE

RUN npm run build


FROM nginx:alpine

COPY --from=compilacion /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
