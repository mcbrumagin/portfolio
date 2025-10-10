# Multi-stage build for ARM64 portfolio application
FROM --platform=linux/arm64 node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY ../../client/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY ../../client/ .

# The app is served as static files, so no build step needed for this simple setup
# If you add a build step later, add it here

# Production stage
FROM --platform=linux/arm64 node:20-alpine

WORKDIR /app

# Install only required runtime dependencies
RUN apk add --no-cache wget

# Copy from builder
COPY --from=builder /app /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8000/health || exit 1

# Start the application
CMD ["node", "app.js"]

