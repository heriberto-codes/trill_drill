## syntax=docker/dockerfile:1

# ----- Build Stage -----
FROM node:18-alpine AS builder
WORKDIR /app

# Install server dependencies
COPY package*.json ./
RUN npm install --only=production

# Install client dependencies and build
COPY client/package*.json client/
RUN cd client && npm install
COPY . .
RUN cd client && npm run build

# ----- Runtime Stage -----
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy server dependencies and built client
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/package*.json ./

EXPOSE 3000
CMD ["node", "src/index.js"]
