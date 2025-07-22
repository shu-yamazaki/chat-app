// クライアントから受け取るリクエストの型定義

import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID, Length } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @Field(() => ID, { description: 'ルームID' })
  @IsUUID()
  roomId: string;

  @Field(() => ID, { description: '送信者ID' })
  @IsUUID()
  senderId: string;

  @Field(() => String, { description: 'メッセージ内容（最大1000文字）' })
  @Length(1, 1000)
  content: string;
}
