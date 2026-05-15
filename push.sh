#!/bin/bash
#
# Stage every change, commit, and push to GitHub.
# Vercel watches origin/main and deploys to https://aebauer.dev on push.
#
# Usage:
#   ./push.sh                          # prompts for a commit message
#   ./push.sh "your commit message"    # uses the argument as-is

set -e

COMMIT_MSG="${1:-}"
if [ -z "$COMMIT_MSG" ]; then
  read -r -p "Commit message (leave empty for 'update'): " COMMIT_MSG
  COMMIT_MSG="${COMMIT_MSG:-update}"
fi

echo "Staging changes..."
git add .

echo "Committing: $COMMIT_MSG"
git commit -m "$COMMIT_MSG" || echo "Nothing to commit — pushing existing history."

echo "Pushing to GitHub (Vercel will deploy to https://aebauer.dev)..."
git push origin main

echo "Done. Live at https://aebauer.dev"
