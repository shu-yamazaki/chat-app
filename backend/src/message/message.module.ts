// message.module.ts
import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessagePrismaRepository } from './repositories/message.prisma.repository';
import { MessageRepository } from './repositories/message.repository';
import { PrismaModule } from '@/prisma/prisma.module';
import { PubSub } from 'graphql-subscriptions';
import { CreateMessageUseCase } from './usecases/create-message.usecase';
import { GetMessagesUseCase } from './usecases/get-message.usecase';

@Module({
  imports: [PrismaModule],
  providers: [
    MessageResolver,
    CreateMessageUseCase,
    GetMessagesUseCase,
    {
      provide: MessageRepository,
      useClass: MessagePrismaRepository,
    },
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [],
})
export class MessageModule {}
