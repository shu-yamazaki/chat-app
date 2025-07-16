FROM node:22-slim

WORKDIR /app

ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo

RUN apt-get update && \
    apt-get install -y locales curl procps && \
    locale-gen ja_JP.UTF-8 && \
    localedef -f UTF-8 -i ja_JP ja_JP

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
