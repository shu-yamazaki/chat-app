## クローンしたときのセットアップ手順
Prismaの依存関係をホスト側（Mac）でインストールすると、
コンテナを起動したときになぜか依存関係がズレてしまう。
コンテナ側で依存関係をインストールするとズレない。

```sh
docker compose exec app pnpm install

# PrismaクライアントとGraphQL型の生成
docker compose exec app npx prisma generate

# DBマイグレーション（初回のみ）
docker compose exec app npx prisma migrate dev

# seed必要なら（初回のみ）
docker compose exec app ts-node prisma/seed.ts
```
## Prismaのイメージ
ファイルが多くて役割の違いがいまいちわからないけど下記のようなイメージ
Mermaid```
User[お客さん]
Client[注文所]
GraphQL[注文メモ]
Server[ジュース工場]
AppModule[工場の全体管理人]
Resolver[注文受付カウンター]
Service[ジュース作成職人]
PrismaService[冷蔵庫アクセス許可ゲート]
Database[冷蔵庫]
schema[ジュース成分表]

クライアントからDBまでの流れは多分こんな感じ
Client --> Server
Server --> Resolver
Resolver --> Service
Service --> PrismaService
PrismaService --> Database

