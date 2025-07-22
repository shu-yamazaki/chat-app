// message.resolver.ts
import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { MessageModel } from './models/message.model';
import { CreateMessageInput } from './models/message.input';
import { CreateMessageUseCase } from './usecases/create-message.usecase';
import { GetMessagesUseCase } from './usecases/get-message.usecase';

@Resolver(() => MessageModel)
export class MessageResolver {
  constructor(
    private readonly createMessageUseCase: CreateMessageUseCase,
    private readonly getMessagesUseCase: GetMessagesUseCase,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => [MessageModel])
  async getMessages(
    @Args('roomId', { type: () => String }) roomId: string,
  ): Promise<MessageModel[]> {
    return this.getMessagesUseCase.execute(roomId);
  }

  @Mutation(() => MessageModel)
  async createMessage(
    @Args('input') input: CreateMessageInput,
  ): Promise<MessageModel> {
    const { roomId, senderId, content } = input;
    return this.createMessageUseCase.execute(content, roomId, senderId);
  }

  @Subscription(() => MessageModel, {
    name: 'messageAdded',
    filter: (
      payload: { messageAdded: MessageModel },
      variables: { roomId: string },
    ) => payload.messageAdded.roomId === variables.roomId,
  })
  messageAdded(
    @Args('roomId', { type: () => String }) _roomId: string,
  ): AsyncIterator<MessageModel> {
    return this.pubSub.asyncIterableIterator('messageAdded');
  }
}
