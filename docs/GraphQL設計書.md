# GraphQL設計

## 最小構成のアクション

| アクション       | 説明                               | クエリ/ミューテーション                      | 関連するテーブル      |
| --------------- | -----------------------------    | ---------------------------------------- | ----------------------|
| ユーザー登録      | メールアドレスとパスワードでユーザー登録 | ミューテーション `registerUser`            | `users`                |
| 公開ルーム自動参加 | ユーザー登録後、公開ルームに自動参加    | ミューテーション `joinRoom`                | `room_members`         |
| メッセージ送信    | 参加中のルームにメッセージを送信       | ミューテーション `sendMessage`             | `messages`              |
| メッセージ受信    | 参加中のルームのメッセージを受信       | クエリ `getMessages`                     | `messages`              |

---

## スキーマ定義

scalar DateTime
<!-- バックエンド側で日付をISO 8601形式で受け渡す想定です -->
<!-- 具体的な実装はバックエンド側に記載します -->

### ユーザー型
type User {
  id: UUID!
  username: String!
  email: String!
  password_hash: String!
  deactivated_at: DateTime
  created_at: DateTime!
  updated_at: DateTime!
}

### メッセージ型
type Message {
  id: UUID!
  user_id: UUID!
  room_id: UUID!
  content: String!
  created_at: DateTime!
  updated_at: DateTime!
}

### ルーム型
type Room {
  id: UUID!
  name: String!
  created_by: UUID!
  created_at: DateTime!
  updated_at: DateTime!
}

### ルームメンバー型
enum Role {
  MEMBER
  ADMIN
}

type RoomMember {
  room_id: UUID!
  user_id: UUID!
  role: Role!
  invited_by: UUID!
  is_active: Boolean!
  joined_at: DateTime!
}

type Mutation {
### ユーザー登録用ミューテーション
  registerUser(username: String!, email: String!, password: String!): User!

#### ルーム参加用ミューテーション
  joinRoom(room_id: UUID!, user_id: UUID!): RoomMember!

#### メッセージ送信用ミューテーション
  sendMessage(room_id: UUID!, user_id: UUID!, content: String!): Message!
}

#### メッセージ取得用クエリ
type Query {
  getMessages(room_id: UUID!): [Message!]!
}