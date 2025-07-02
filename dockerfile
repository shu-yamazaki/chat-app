FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml package.json ./
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "start:dev"]
