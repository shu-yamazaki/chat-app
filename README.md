# DB設計

## 1.users（ユーザー）テーブル 
ユーザー情報を管理するテーブル。
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,  -- ユーザー名（ログインID）
  email TEXT UNIQUE,  -- メールアドレス
  password_hash TEXT,  -- パスワード（ハッシュ化）
  is_active BOOLEAN DEFAULT TRUE,  -- 退会管理用
  deactivated_at TIMESTAMP,  -- 退会日時
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- アカウント作成日時
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- 最終更新日時
);
```

## 2. authentications（認証）テーブル
ユーザーの認証情報を管理するテーブル。
```sql
CREATE TABLE authentications (
  id SERIAL PRIMARY KEY, 
  user_id INTEGER REFERENCES users(id),  -- ユーザーID
  provider TEXT NOT NULL,  -- 認証方式の識別
  provider_user_id TEXT NOT NULL,  -- 外部認証サービスのユーザーID
  token TEXT,  -- 認証用トークン
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 認証情報の作成日時
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- 認証情報の更新日時
);
```

## 3. messages（メッセージ）テーブル
メッセージ送信と受信を管理するテーブル。
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),  -- 送信者のユーザーID
  room_id INTEGER REFERENCES rooms(id),  -- 所属するルームID
  content TEXT,  -- メッセージ内容
  media_url TEXT,  -- 画像やメディアのURL
  status TEXT DEFAULT 'unread',  -- メッセージの状態（既読,未読）
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- メッセージ送信日時
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- メッセージ更新日時
);
```

## 4. rooms（ルーム）テーブル
チャットルームに関する基本的な情報を管理するテーブル。
```sql
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,  -- ルーム名
  created_by INTEGER REFERENCES users(id),  -- ルーム作成者のユーザーID
  visibility TEXT DEFAULT 'public',  -- ルームの可視性（公開、非公開、招待制など）
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- ルーム作成日時
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- ルーム更新日時
);
```

## 5. room_members（ルームメンバー）テーブル
ユーザーとルームの多対多のリレーションを管理するテーブル。
```sql
CREATE TABLE room_members (
  room_id INTEGER REFERENCES rooms(id),  -- ルームID
  user_id INTEGER REFERENCES users(id),  -- ユーザーID
  role TEXT DEFAULT 'member',  -- 役割（管理者、メンバー、ゲストなど）
  invited_by INTEGER REFERENCES users(id), -- 招待者
  is_active BOOLEAN DEFAULT TRUE,  -- ルーム参加状態
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 参加日時
  PRIMARY KEY (room_id, user_id)  -- ルームへの重複参加防止
);
```

## 6. likes（いいね）テーブル
ユーザーがメッセージに対して「いいね！」をする機能に対応するテーブル。
```sql
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),  -- いいねをしたユーザーのID
  message_id INTEGER REFERENCES messages(id),  -- いいねが付けられたメッセージID
  is_active BOOLEAN DEFAULT TRUE,  -- いいねが有効かどうか
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- いいねを付けた日時
);
```

## 7. read_receipts（既読）テーブル
メッセージの既読状態を管理するテーブル。
```sql
CREATE TABLE read_receipts (
  id SERIAL PRIMARY KEY,
  message_id INTEGER REFERENCES messages(id),  -- メッセージID
  user_id INTEGER REFERENCES users(id),  -- 既読をつけたユーザーのID
  is_read BOOLEAN DEFAULT TRUE,  -- 既読状態
);
```

## 8. mentions（メンション）テーブル
メッセージ内でユーザーがメンションされた情報を管理するテーブル。
```sql
CREATE TABLE mentions (
  id SERIAL PRIMARY KEY,
  message_id INTEGER REFERENCES messages(id),  -- メッセージID
  mentioned_user_id INTEGER REFERENCES users(id),  -- メンションされたユーザーのID
);
```


## 9. notifications（通知）テーブル
通知機能に対応するテーブル。
```sql
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),  -- 通知を受け取るユーザーID
  message_id INTEGER REFERENCES messages(id),  -- 通知対象メッセージ
  target_user_id INTEGER REFERENCES users(id),  -- 通知対象ユーザー（フォロー時）
  notification_type TEXT,  -- 通知内容（メッセージ、いいね、メンション、フォロー）
  is_read BOOLEAN DEFAULT FALSE,  -- 既読状態
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 通知作成日時
);
```

## 10. follows（フォロー）テーブル
ユーザー同士がフォローする機能に対応するテーブル。
```sql
CREATE TABLE follows (
  follower_id INTEGER REFERENCES users(id),  -- フォローするユーザー
  followed_id INTEGER REFERENCES users(id),  -- フォローされるユーザー
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, --フォロー日時
  PRIMARY KEY (follower_id, followed_id)  -- 重複フォロー防止
);
```

## 11. profiles（プロフィール）テーブル
ユーザーのプロフィール情報を管理するテーブル。
```sql
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),  -- ユーザーID
  bio TEXT,  -- 自己紹介文
  profile_picture_url TEXT,  -- プロフィール画像のURL
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- 更新日時
);
```
