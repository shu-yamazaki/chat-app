// クライアントに返すレスポンスの型定義
// DBとサーバー間はPrismaの型定義を使うが、
// クライアントとサーバー間はGraphQLの型定義を使う

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserModel } from '@/user/models/user.model';

@ObjectType()
export class MessageModel {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field()
  roomId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => UserModel)
  user: UserModel;
}
