import { useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { GetMessages, OnMessageAdded } from "@/app/rooms/_lib/gql/messages";
import {
  FragmentType,
  getFragmentData,
  makeFragmentData,
} from "@/gql/fragment-masking";
import {
  MessageRequestFragmentDoc,
  type MessageRequestFragment,
} from "@/gql/graphql";

type Options = {
  initialMessages?: FragmentType<typeof MessageRequestFragmentDoc>[];
  onOwnMessageAdded?: () => void;
  onAnyMessageAddedAtBottom?: () => void;
  isAtBottomRef?: React.RefObject<boolean>;
};

export function useLiveMessages(
  roomId: string,
  currentUserId: string,
  opts?: Options
) {
  const { initialMessages } = opts ?? {};

  // クエリで初期メッセージを取得
  const { data, loading, error, client } = useQuery(GetMessages, {
    variables: { roomId },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network",
  });

  // 初期メッセージをキャッシュに書き込む
  useEffect(() => {
    if (!initialMessages?.length) return;

    const unmasked = initialMessages
      .map((n) => getFragmentData(MessageRequestFragmentDoc, n))
      .filter(Boolean) as MessageRequestFragment[];

    client.cache.writeQuery({
      query: GetMessages,
      variables: { roomId },
      data: { getMessages: unmasked },
    });
  }, [roomId]);

  // サブスクリプションで新着メッセージを受信
  useSubscription(OnMessageAdded, {
    variables: { roomId },
    onData: ({ data: sub }) => {
      const masked = sub.data?.messageAdded;
      if (!masked) return;

      // アンマスクしてから新着メッセージを処理
      const newMsg = getFragmentData(MessageRequestFragmentDoc, masked) as
        | MessageRequestFragment
        | undefined;
      if (!newMsg) return;

      // 正規化してからキャッシュに書き込むと重複を防げる
      const newRef = client.cache.writeFragment({
        fragment: MessageRequestFragmentDoc,
        data: newMsg,
      });
      // 新着メッセージを既存のメッセージリストに追加
      client.cache.modify({
        fields: {
          getMessages(existing = [], { readField }) {
            const id = newMsg.id;
            if (existing.some((ref: any) => readField("id", ref) === id))
              return existing;
            return [...existing, newRef];
          },
        },
      });

      // 自分の送信なら最下部にスクロール
      // 相手の送信なら最下部にいるときだけ最下部へスクロールしたいけどできてない
      if (newMsg.user?.id === currentUserId) {
        opts?.onOwnMessageAdded?.();
      } else if (opts?.isAtBottomRef?.current) {
        opts?.onAnyMessageAddedAtBottom?.();
      }
    },
  });

  // 
  const maskedFromQuery =
    data?.getMessages?.map((m) =>
      makeFragmentData(m as MessageRequestFragment, MessageRequestFragmentDoc)
    ) ?? undefined;

  return {
    messages: maskedFromQuery ?? initialMessages,
    loading,
    error,
  };
}
