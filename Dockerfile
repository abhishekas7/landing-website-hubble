# ─────────────────────────────────────────────
# Stage 1 — builder
# node:20-slim (Debian) avoids musl/OpenSSL GCM cipher failures
# that occur with node:20-alpine during yarn install over TLS.
# ─────────────────────────────────────────────
FROM node:20-slim AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn build


# ─────────────────────────────────────────────
# Stage 2 — runner
# Stays on Debian-slim for OpenSSL compatibility.
# Installs system Chromium so Playwright can run the scraper
# without downloading its own browser bundle.
# ─────────────────────────────────────────────
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install Chromium for the Playwright scraper
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Tell Playwright to use the system Chromium (skip its own download)
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/playwright ./node_modules/playwright
COPY --from=builder /app/node_modules/playwright-core ./node_modules/playwright-core

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]