# ─────────────────────────────────────────────
# Stage 1 — Builder
# ─────────────────────────────────────────────
FROM node:22-slim AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn build


# ─────────────────────────────────────────────
# Stage 2 — Runner
# ─────────────────────────────────────────────
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install Chromium
RUN apt-get update && \
    apt-get install -y --no-install-recommends chromium && \
    rm -rf /var/lib/apt/lists/*

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium

# Next.js standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Playwright
COPY --from=builder /app/node_modules/playwright ./node_modules/playwright
COPY --from=builder /app/node_modules/playwright-core ./node_modules/playwright-core

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]