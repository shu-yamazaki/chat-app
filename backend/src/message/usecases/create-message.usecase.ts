// メッセージ送信時の処理の流れ
// ここで定義した順番で処理が実行される+ロジックもここに書くのがクリーンアーキテクチャの考え方らしい

import { Injectable, Inject } from '@nestjs/common';
import {
  MessageRepository,
  MessageWithUser,
} from '../repositories/message.repository';
import { PubSub } from 'graphql-subscriptions';

// UseCaseとしてメッセージ作成のロジックを定義
@Injectable()
export class CreateMessageUseCase {
  constructor(
    private readonly messageRepository: MessageRepository,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  //   メッセージを作成する処理
  async execute(
    content: string,
    roomId: string,
    userId: string,
  ): Promise<MessageWithUser> {
    const newMessage = await this.messageRepository.createMessage(
      content,
      roomId,
      userId,
    );

    // メッセージが作成されたら、PubSubを使って通知を発行
    await this.pubSub.publish('messageAdded', {
      messageAdded: newMessage,
    });

    console.log('[PubSub] Published message:', newMessage);
    return newMessage;
  }
}
