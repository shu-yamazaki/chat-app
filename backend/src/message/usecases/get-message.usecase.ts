// メッセージ受信時の処理

import { Injectable } from '@nestjs/common';
import {
  MessageRepository,
  MessageWithUser,
} from '@/message/repositories/message.repository';

@Injectable()
export class GetMessagesUseCase {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(roomId: string): Promise<MessageWithUser[]> {
    return this.messageRepository.findMessagesByRoomId(roomId);
  }
}
