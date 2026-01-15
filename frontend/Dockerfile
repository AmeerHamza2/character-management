# Frontend Dockerfile
FROM node:18-alpine AS base

WORKDIR /app

# Copy package files
COPY package*.json ./

# ============================================
# Development stage
# ============================================
FROM base AS development

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# ============================================
# Builder stage (for production)
# ============================================
FROM base AS builder

RUN npm ci

COPY . .

# Build the application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ============================================
# Production stage
# ============================================
FROM node:18-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
