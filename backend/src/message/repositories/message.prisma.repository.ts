// 抽象クラスで定義した型を使いDB操作を実装する具象クラス
// 型の中身を書くことを抽象クラス側から強制させる

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { MessageRepository, Message } from './message.repository';

@Injectable()
export class MessagePrismaRepository implements MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMessagesByRoomId(roomId: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
      include: { user: true },
    });
  }

  async createMessage(
    content: string,
    roomId: string,
    userId: string,
  ): Promise<Message> {
    return this.prisma.message.create({
      data: { content, roomId, userId },
      include: { user: true },
    });
  }
}
