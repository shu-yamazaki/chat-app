// サーバーサイドでGraphQLを使って既存のメッセージを取得する関数

import "server-only";
import { print } from "graphql";
import { GetMessages } from "@/app/rooms/_lib/gql/messages";
import {
  MessageRequestFragmentDoc,
  type MessageRequestFragment,
} from "@/gql/graphql";
import { makeFragmentData } from "@/gql/fragment-masking";

const ENDPOINT =
  process.env.GRAPHQL_SERVER_HTTP ??
  process.env.NEXT_GRAPHQL_BROWSER_HTTP ??
  "http://localhost:3000/graphql";

// GraphQLのクエリを文字列に変換
const GET_MESSAGES_SDL = print(GetMessages);

type GqlError = { message: string };
type GqlResp = {
  data?: { getMessages: MessageRequestFragment[] };
  errors?: GqlError[];
};

// サーバーサイドでメッセージを取得する関数。Apolloはクライアントコンポーネント向けらしいのでfetch
export async function serverFetchRoomMessages(roomId: string) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: GET_MESSAGES_SDL,
      variables: { roomId },
    }),
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`);

  // レスポンスをJSONとしてパース
  const json = (await res.json()) as GqlResp;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("\n"));
  }

  const nodes = json.data?.getMessages ?? [];

  return nodes.map((n) => makeFragmentData(n, MessageRequestFragmentDoc));
}
