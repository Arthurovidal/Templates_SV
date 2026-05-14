# Premium Templates — 4 Templates Vitrines Premium

> Système de 4 templates professionnels pour le marché camerounais, africain et international.
> Mono-repo Next.js 15 · TypeScript strict · Tailwind CSS · Docker · CI/CD

---

## 🗂️ Templates disponibles

| Template | Port | Description | Cible |
|---|---|---|---|
| **Corporate** | `:3001` | Noir/Or · Playfair Display | Cabinets, Finance, Consulting |
| **Santé** | `:3002` | Blanc/Bleu · Plus Jakarta Sans | Cliniques, Pharmacies, Labos |
| **Immobilier** | `:3003` | Crème/Or · Cormorant Garamond | Agences, Résidences |
| **Lifestyle** | `:3004` | Noir/Or chaud · Bebas Neue | Restaurants, Salons, Mode |

---

## ⚡ Démarrage rapide

### Prérequis (Fedora 44)
```bash
# Exécuter le script de setup automatique
chmod +x infra/scripts/setup-fedora.sh
./infra/scripts/setup-fedora.sh
```

### Installation
```bash
# 1. Cloner le repository
git clone <repo-url> && cd premium-templates

# 2. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs (Resend API key, WhatsApp, etc.)

# 3. Installer les dépendances
pnpm install

# 4. Démarrer un template spécifique
pnpm dev:corporate    # → http://localhost:3001
pnpm dev:sante        # → http://localhost:3002
pnpm dev:immobilier   # → http://localhost:3003
pnpm dev:lifestyle    # → http://localhost:3004

# 5. Démarrer tous les templates
pnpm dev:all
```

### Avec Docker
```bash
# Build et démarrage
docker compose up --build

# Un seul template
docker compose up corporate redis
```

---

## 📁 Structure du projet

```
premium-templates/
├── apps/
│   ├── corporate/      # Template 1 — Port 3001
│   ├── sante/          # Template 2 — Port 3002
│   ├── immobilier/     # Template 3 — Port 3003
│   └── lifestyle/      # Template 4 — Port 3004
├── packages/
│   ├── config/         # ESLint, Prettier, TypeScript, Tailwind
│   ├── types/          # Types TypeScript partagés
│   ├── utils/          # Utilitaires: format, WhatsApp, email, validation
│   └── ui/             # Design System: composants, hooks, tokens
├── infra/
│   ├── nginx/          # Configuration reverse proxy
│   └── scripts/        # Scripts d'installation et déploiement
├── .github/workflows/  # CI/CD GitHub Actions
├── docker-compose.yml
├── PROGRESS.md         # Journal d'avancement du projet
└── README.md
```

---

## 🔧 Commandes disponibles

```bash
# Développement
pnpm dev:corporate      # Template 1 uniquement
pnpm dev:sante          # Template 2 uniquement
pnpm dev:immobilier     # Template 3 uniquement
pnpm dev:lifestyle      # Template 4 uniquement
pnpm dev:all            # Les 4 en parallèle

# Build
pnpm build              # Build tous les templates
pnpm build:corporate    # Build un template

# Qualité
pnpm lint               # ESLint sur tout le projet
pnpm typecheck          # TypeScript strict check
pnpm format             # Prettier sur tout le projet

# Nettoyage
pnpm clean              # Nettoyer les builds Turbo
pnpm clean:all          # Nettoyer node_modules + .next + .turbo
```

---

## 🌍 Optimisations marché africain

- **Connexions lentes** : Code splitting, images AVIF/WebP, lazy loading systématique
- **Appareils low-end** : Bundle JS initial < 150Ko, animations CSS-first
- **Mobile-first** : Design pensé pour écrans < 400px
- **WhatsApp** : Intégration native `wa.me` (canal n°1 en Afrique)
- **Offline partiel** : Service Worker pour assets statiques
- **Fonts locales** : `next/font` — zéro requête externe

---

## 🔒 Sécurité

- Headers CSP (Content Security Policy) sur toutes les routes
- Rate limiting Redis sur les formulaires (3 req/min par IP)
- Validation Zod côté client ET serveur (double sécurité)
- Honeypot anti-bot dans tous les formulaires
- Non-root user dans les containers Docker
- Variables sensibles JAMAIS préfixées `NEXT_PUBLIC_`

---

## 📊 Scores Lighthouse cibles

| Métrique | Cible |
|---|---|
| Performance | > 90 |
| SEO | > 95 |
| Accessibilité | > 90 |
| Best Practices | > 95 |

---

## 🚀 Déploiement

### Vercel (recommandé pour démos clients)
```bash
# Installer Vercel CLI
pnpm add -g vercel

# Déployer un template
cd apps/corporate && vercel --prod
```

### VPS Docker (self-hosted)
```bash
# Sur le serveur
git clone <repo> && cd premium-templates
cp .env.example .env && nano .env
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

---

## 📝 Avancement

Consultez [PROGRESS.md](./PROGRESS.md) pour l'état détaillé du projet,
les décisions architecturales, et les tâches restantes.

---

## 🛠️ Technologies

Next.js 15 · React 19 · TypeScript 5.7 · Tailwind CSS 3.4 · Framer Motion 11
next-intl · React Hook Form · Zod · Resend · Redis · Docker · Nginx · Turborepo · pnpm
