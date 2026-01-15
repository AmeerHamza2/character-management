# Backend Dockerfile
FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies for Prisma and healthcheck
RUN apk add --no-cache openssl netcat-openbsd

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# ============================================
# Development stage
# ============================================
FROM base AS development

RUN npm install

COPY . .

# Generate Prisma client (provide dummy URL for build time)
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

# Copy and setup entrypoint script
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "run", "start:dev"]

# ============================================
# Builder stage (for production)
# ============================================
FROM base AS builder

RUN npm ci

COPY . .

# Generate Prisma client (provide dummy URL for build time)
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

# Build the application
RUN npm run build

# ============================================
# Production stage
# ============================================
FROM node:18-alpine AS production

WORKDIR /app

RUN apk add --no-cache openssl netcat-openbsd

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy Prisma files and generate client
COPY prisma ./prisma/
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

# Copy built application
COPY --from=builder /app/dist ./dist

# Copy entrypoint script
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]
