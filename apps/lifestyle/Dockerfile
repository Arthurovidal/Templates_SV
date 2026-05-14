# ══════════════════════════════════════════════════════════════
# TEMPLATE CORPORATE — Dockerfile Multi-Stage
#
# Stratégie multi-stage:
#   Stage 1 (base)    → Image de base avec pnpm
#   Stage 2 (deps)    → Installation dépendances (cachée)
#   Stage 3 (builder) → Build Next.js
#   Stage 4 (runner)  → Image finale minimale (~200Mo vs ~1Go)
#
# Build: docker build -t template-lifestyle .
# Run:   docker run -p 3004:3004 --env-file .env template-lifestyle
# ══════════════════════════════════════════════════════════════

# ── Stage 1: Base ─────────────────────────────────────────────
FROM node:20-alpine AS base
# pnpm via corepack (inclus dans Node.js 20+)
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
# Dépendances système pour certains modules natifs
RUN apk add --no-cache libc6-compat

# ── Stage 2: Dépendances ──────────────────────────────────────
FROM base AS deps
WORKDIR /app

# Copier les fichiers de configuration workspace
COPY package.json pnpm-workspace.yaml ./
# pnpm-lock.yaml sera créé après pnpm install initial
COPY pnpm-lock.yaml* ./

# Copier les package.json de tous les packages (pour le workspace)
COPY packages/config/package.json ./packages/config/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY packages/ui/package.json ./packages/ui/

# Copier le package.json de cette app
COPY apps/lifestyle/package.json ./apps/lifestyle/

# Installer les dépendances (la couche est mise en cache si les package.json n'ont pas changé)
RUN pnpm install --frozen-lockfile --ignore-scripts

# ── Stage 3: Builder ──────────────────────────────────────────
FROM base AS builder
WORKDIR /app

# Récupérer les node_modules du stage précédent
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages

# Copier tout le source code
COPY . .

# Variables d'environnement pour le build (valeurs non-sensibles seulement)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build uniquement le template lifestyle via Turborepo
RUN pnpm turbo build --filter=@template/lifestyle

# ── Stage 4: Runner ───────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3004
ENV HOSTNAME="0.0.0.0"

# Sécurité: utiliser un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copier les fichiers produits par le build standalone
# next.config.ts doit avoir output: 'standalone'
COPY --from=builder /app/apps/lifestyle/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/lifestyle/.next/static \
     ./apps/lifestyle/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/lifestyle/public \
     ./apps/lifestyle/public

# Passer à l'utilisateur non-root
USER nextjs

# Port exposé
EXPOSE 3004

# Healthcheck — vérifie que le serveur répond
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3004/api/health || exit 1

# Démarrer le serveur standalone Next.js
CMD ["node", "apps/lifestyle/server.js"]
