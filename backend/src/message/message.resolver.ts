// クライアントからの注文を受け付けて、DBの情報を取得するための司令を出す役割らしい

import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from '@/@generated/message/message.model';
import { ParseUUIDPipe, Inject } from '@nestjs/common';
import { MessageModel } from './models/message.model';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => MessageModel)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  // クエリ: 特定のルームIDのメッセージ一覧を取得
  @Query(() => [MessageModel])
  async getMessages(
    @Args('roomId', { type: () => String }, ParseUUIDPipe) roomId: string,
  ): Promise<Message[]> {
    return this.messageService.getMessagesByRoomId(roomId);
  }

  // ミューテーション: メッセージを作成
  @Mutation(() => MessageModel)
  async createMessage(
    @Args('content', { type: () => String }) content: string,
    @Args('roomId', { type: () => String }, ParseUUIDPipe) roomId: string,
    @Args('userId', { type: () => String }, ParseUUIDPipe) userId: string,
  ): Promise<Message> {
    return this.messageService.createMessage(content, roomId, userId);
  }

  // サブスクリプション: あるルームに新しいメッセージが追加されたときに通知
  @Subscription(() => MessageModel, {
    name: 'messageAdded',
    filter: (
      payload: { messageAdded: { roomId: string } },
      variables: { roomId: string },
    ) => payload.messageAdded.roomId === variables.roomId, // ルームIDが一致する場合に通知
  })
  messageAdded(
    @Args('roomId', { type: () => String }) _roomId: string,
  ): AsyncIterator<MessageModel> {
    return this.pubSub.asyncIterableIterator('messageAdded');
  }
}
