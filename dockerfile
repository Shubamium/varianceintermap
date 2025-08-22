FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install


# 2. Copy code and build
COPY . .
RUN npm run build

# 3. Start app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

#