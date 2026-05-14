#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════
# SETUP FEDORA 44 — Environnement de développement
# Premium Templates Project
#
# Usage: chmod +x setup-fedora.sh && ./setup-fedora.sh
# Testé sur: Fedora 40, 41, 42, 44
# ══════════════════════════════════════════════════════════════

set -euo pipefail

# ── Couleurs ──────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; BOLD='\033[1m'; RESET='\033[0m'

log()  { echo -e "${BLUE}[INFO]${RESET} $1"; }
ok()   { echo -e "${GREEN}[OK]${RESET} $1"; }
warn() { echo -e "${YELLOW}[WARN]${RESET} $1"; }
err()  { echo -e "${RED}[ERR]${RESET} $1"; exit 1; }

echo -e "${BOLD}════════════════════════════════════════${RESET}"
echo -e "${BOLD}  Premium Templates — Setup Fedora 44   ${RESET}"
echo -e "${BOLD}════════════════════════════════════════${RESET}"
echo ""

# ── 1. Mise à jour système ────────────────────────────────────
log "Mise à jour du système..."
sudo dnf update -y --quiet
ok "Système à jour"

# ── 2. Outils de base ────────────────────────────────────────
log "Installation des outils de base..."
sudo dnf install -y \
  git \
  curl \
  wget \
  unzip \
  jq \
  gcc \
  make \
  openssl \
  --quiet
ok "Outils de base installés"

# ── 3. Node.js via nvm ───────────────────────────────────────
# NVM est préféré à dnf car il permet de gérer plusieurs versions Node
log "Installation de nvm..."

if [ -d "$HOME/.nvm" ]; then
  warn "nvm déjà installé, mise à jour..."
  cd "$HOME/.nvm" && git pull --quiet && cd -
else
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
fi

# Charger nvm dans la session courante
export NVM_DIR="$HOME/.nvm"
# shellcheck source=/dev/null
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Ajouter nvm au .bashrc et .zshrc si pas déjà présent
for rc_file in "$HOME/.bashrc" "$HOME/.zshrc"; do
  if [ -f "$rc_file" ] && ! grep -q "NVM_DIR" "$rc_file"; then
    cat >> "$rc_file" << 'NVM_INIT'

# NVM — Node Version Manager
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
NVM_INIT
    log "nvm ajouté à $rc_file"
  fi
done

# Installer Node.js 20 LTS
log "Installation de Node.js 20 LTS..."
nvm install 20
nvm use 20
nvm alias default 20
NODE_VER=$(node --version)
ok "Node.js installé: $NODE_VER"

# ── 4. pnpm ─────────────────────────────────────────────────
log "Installation de pnpm via corepack..."
corepack enable
corepack prepare pnpm@9.15.4 --activate
PNPM_VER=$(pnpm --version)
ok "pnpm installé: $PNPM_VER"

# ── 5. Docker ────────────────────────────────────────────────
# NOTE: Fedora supporte Docker ET Podman
# Podman est souvent pré-installé sur Fedora
# Nous installons Docker car docker-compose est plus standardisé

if command -v docker &>/dev/null; then
  ok "Docker déjà installé: $(docker --version)"
else
  log "Installation de Docker..."

  # Supprimer Podman si présent (évite les conflits)
  if command -v podman &>/dev/null; then
    warn "Podman détecté. Pour utiliser Docker, vous pouvez garder les deux."
    warn "Podman est compatible avec la plupart des commandes Docker."
  fi

  # Repo Docker officiel
  sudo dnf -y install dnf-plugins-core --quiet
  sudo dnf config-manager --add-repo \
    https://download.docker.com/linux/fedora/docker-ce.repo

  sudo dnf install -y docker-ce docker-ce-cli containerd.io \
    docker-buildx-plugin docker-compose-plugin --quiet

  # Démarrer et activer Docker
  sudo systemctl start docker
  sudo systemctl enable docker

  # Ajouter l'utilisateur au groupe docker (évite sudo)
  sudo usermod -aG docker "$USER"
  warn "Vous devez vous déconnecter/reconnecter pour utiliser Docker sans sudo"

  ok "Docker installé: $(docker --version)"
fi

# ── 6. Docker Compose ────────────────────────────────────────
if docker compose version &>/dev/null 2>&1; then
  ok "Docker Compose v2 disponible: $(docker compose version)"
else
  log "Installation Docker Compose standalone..."
  COMPOSE_VERSION="2.32.4"
  sudo curl -SL \
    "https://github.com/docker/compose/releases/download/v${COMPOSE_VERSION}/docker-compose-linux-x86_64" \
    -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  ok "Docker Compose installé: $(docker-compose --version)"
fi

# ── 7. VS Code extensions via CLI ───────────────────────────
if command -v code &>/dev/null; then
  log "Installation des extensions VS Code..."

  extensions=(
    "dbaeumer.vscode-eslint"
    "esbenp.prettier-vscode"
    "bradlc.vscode-tailwindcss"
    "usernamehw.errorlens"
    "eamodio.gitlens"
    "lokalise.i18n-ally"
    "ms-azuretools.vscode-docker"
    "formulahendry.auto-rename-tag"
    "christian-kohler.path-intellisense"
    "PKief.material-icon-theme"
    "mikestead.dotenv"
    "streetsidesoftware.code-spell-checker"
    "streetsidesoftware.code-spell-checker-french"
    "ms-playwright.playwright"
  )

  for ext in "${extensions[@]}"; do
    code --install-extension "$ext" --force 2>/dev/null || \
      warn "Extension non installée: $ext"
  done

  ok "Extensions VS Code installées"
else
  warn "VS Code non trouvé. Installez les extensions manuellement depuis .vscode/extensions.json"
fi

# ── 8. Git configuration ────────────────────────────────────
if [ -z "$(git config --global user.name 2>/dev/null)" ]; then
  warn "Git non configuré. Veuillez exécuter:"
  echo "  git config --global user.name 'Votre Nom'"
  echo "  git config --global user.email 'votre@email.com'"
else
  ok "Git configuré: $(git config --global user.name)"
fi

# ── 9. Résumé ────────────────────────────────────────────────
echo ""
echo -e "${BOLD}════════════════════════════════════════${RESET}"
echo -e "${GREEN}✅ Setup terminé !${RESET}"
echo -e "${BOLD}════════════════════════════════════════${RESET}"
echo ""
echo "Versions installées:"
echo "  Node.js : $(node --version)"
echo "  pnpm    : $(pnpm --version)"
echo "  Docker  : $(docker --version 2>/dev/null || echo 'voir ci-dessus')"
echo "  Git     : $(git --version)"
echo ""
echo -e "${BOLD}Prochaines étapes:${RESET}"
echo "  1. cd premium-templates"
echo "  2. cp .env.example .env && nano .env"
echo "  3. pnpm install"
echo "  4. pnpm dev:corporate   # Démarrer template corporate"
echo "  5. Ouvrir http://localhost:3001"
echo ""
echo -e "${YELLOW}⚠️  Reconnectez-vous pour que les groupes Docker s'appliquent${RESET}"
