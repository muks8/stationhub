# 🔹 Stage 1: Build React App
FROM node:18-alpine AS build

WORKDIR /app

# Dependencies copy
COPY package*.json ./
RUN npm install

# Source code copy
COPY . .

# Build app
RUN npm run build


# 🔹 Stage 2: Serve with NGINX
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy build files
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]