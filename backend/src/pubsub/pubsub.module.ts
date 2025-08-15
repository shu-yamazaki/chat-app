import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(), // 本番では RedisPubSub を使うらしい
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}
