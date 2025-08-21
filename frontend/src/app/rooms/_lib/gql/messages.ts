// リクエストを定義してcodegenによって型と型付きリクエストを生成する
// コンポーネント側で型付きリクエストをインポートして使用する

import { graphql } from "@/gql";

// 共通のフィールドを1か所にしてフラグメント化
// これをもとにcodegenがMessageRequestFragment型を生成する
// コンポーネントで使うときはuseFragmentを使って型を明示する必要がある
export const MessageRequest = graphql(`
  fragment MessageRequest on MessageModel {
    # 戻り値がMessageModel型のときだけ使える
    __typename
    id
    content
    roomId
    createdAt
    user {
      __typename
      id
      name
    }
  }
`);

// コンポーネントで使うリクエストを定義
export const GetMessages = graphql(`
  query GetMessages($roomId: String!) {
    getMessages(roomId: $roomId) {
      ...MessageRequest
    }
  }
`);

export const CreateMessage = graphql(`
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      ...MessageRequest
    }
  }
`);

export const OnMessageAdded = graphql(`
  subscription OnMessageAdded($roomId: String!) {
    messageAdded(roomId: $roomId) {
      ...MessageRequest
    }
  }
`);
