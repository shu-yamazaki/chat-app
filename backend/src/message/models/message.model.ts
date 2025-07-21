// コードファーストでGraphQLの型を定義するためのモデル
// Prismaのスキーマを橋渡しして、GraphQLの型を自動生成してあげてるらしい

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

// 投稿用のinput型も別ファイルをあとで定義するべき
