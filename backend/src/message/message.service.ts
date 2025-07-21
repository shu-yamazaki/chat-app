// ロジックを書く役割らしい

import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Message } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  // 指定したルームのメッセージを取得（古い順）
  async getMessagesByRoomId(roomId: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { roomId: roomId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: true,
      },
    });
  }

  // メッセージの作成＋サブスクリプションイベントの発行
  async createMessage(
    content: string,
    roomId: string,
    userId: string,
  ): Promise<Message> {
    const newMessage = await this.prisma.message.create({
      data: {
        content,
        roomId: roomId,
        userId: userId,
      },
      include: {
        user: true,
      },
    });

    // サブスクリプションイベントを発火させる
    await this.pubSub.publish('messageAdded', {
      messageAdded: newMessage,
    });
    console.log('[PubSub] Published message:', newMessage);
    return newMessage;
  }
}
