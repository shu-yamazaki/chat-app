// repositoryの抽象クラス
// 型定義だけして、実際の操作は具象クラスで定義する

export type User = {
  id: string;
};

export type Message = {
  id: string;
  content: string;
  roomId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};

export abstract class MessageRepository {
  abstract findMessagesByRoomId(roomId: string): Promise<Message[]>;
  abstract createMessage(
    content: string,
    roomId: string,
    userId: string,
  ): Promise<Message>;
}
