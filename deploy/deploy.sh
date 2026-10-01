#!/bin/sh
# Copy the site to the server. Usage: ./deploy/deploy.sh user@server-ip
# Only the public site files are sent; briefs, deploy notes and .git stay local.
set -e
[ -n "$1" ] || { echo "usage: $0 user@host"; exit 1; }
cd "$(dirname "$0")/.."
rsync -avz --delete \
  --exclude '.git' --exclude '.DS_Store' --exclude 'deploy' --exclude '*.md' \
  ./ "$1":/var/www/mis/
