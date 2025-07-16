// NestJSでPrismaを使うための設定

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// NestJSのDIコンテナにPrismaClientを統合する設定
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // アプリ起動時にPrismaClientを接続
  async onModuleInit() {
    await this.$connect();
  }

  // アプリ終了時にPrismaClientを切断
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
