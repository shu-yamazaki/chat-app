// repositoryの抽象クラス
// 型定義だけして、実際の操作は具象クラスで定義する

import { Prisma } from '@prisma/client';

export type MessageWithUser = Prisma.MessageGetPayload<{
  include: { user: true };
}>;

export abstract class MessageRepository {
  abstract findMessagesByRoomId(roomId: string): Promise<MessageWithUser[]>;
  abstract createMessage(
    content: string,
    roomId: string,
    userId: string,
  ): Promise<MessageWithUser>;
}
