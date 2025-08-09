# プロジェクトルートの Dockerfile

# 共通ベースステージ
FROM node:22-slim AS base

ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo

RUN apt-get update && \
    apt-get install -y locales curl procps openssl && \
    locale-gen ja_JP.UTF-8 && \
    localedef -f UTF-8 -i ja_JP ja_JP && \
    corepack enable && corepack prepare pnpm@10.13.1 --activate

# Backend ステージ
FROM base AS backend

WORKDIR /backend
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN pnpm install
COPY backend ./
COPY backend/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
CMD ["pnpm","start:dev"]

# Frontend ステージ
FROM base AS frontend

WORKDIR /frontend
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install
COPY frontend ./
EXPOSE 3000
CMD ["pnpm", "dev"]
