# Debian-based image: Prisma needs glibc and OpenSSL (Alpine/musl causes schema engine errors)
FROM node:18-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
