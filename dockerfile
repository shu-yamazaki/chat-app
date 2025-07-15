FROM node:22-slim

WORKDIR /app

# PrismaCLIのためにOpenSSLをインストール
# Procpsはクラッシュ対策
RUN apt-get update && apt-get install -y openssl procps && rm -rf /var/lib/apt/lists/*

# Dockerイメージ内でpnpmを使用するためにCorepackを有効化
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

COPY package.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "start:dev"]
