# 開発コンテナ起動時に依存関係をインストールする

#!/usr/bin/env bash
set -euo pipefail

cd /workspace/chat-app/backend

# 初回だけインストール（pnpm使用時の目印ファイルで判定）
if [ ! -d node_modules ] || [ ! -f node_modules/.modules.yaml ]; then
  echo "→ Installing deps (backend)…"
  pnpm install
  pnpm prisma generate || true
fi

exec pnpm start:dev
