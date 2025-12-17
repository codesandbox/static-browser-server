# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm (repo uses pnpm in its scripts)
RUN npm install -g pnpm

# Install deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build static-browser-server outputs
COPY . .
RUN npm run build      # this runs build-relay and friends, generating out/preview

# ---------- Runtime stage ----------
FROM nginx:alpine

# This is crucial: serve the *preview* directory as web root
COPY --from=builder /app/out/preview /usr/share/nginx/html

# Nginx already listens on 0.0.0.0:80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

