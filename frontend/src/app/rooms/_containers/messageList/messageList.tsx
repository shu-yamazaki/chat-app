"use client";

import { getFragmentData, FragmentType } from "@/gql/fragment-masking";
import { MessageRequestFragmentDoc } from "@/gql/graphql";
import { useLiveMessages } from "@/app/rooms/_containers/messageList/useLiveMessages";
import { useMessageScroll } from "@/app/rooms/_containers/messageList/useMessageScroll";
import MessageItem from "../parts/messageItem/messageItem";

export default function MessageList({
  roomId,
  currentUserId,
  initialMessages,
}: {
  roomId: string;
  currentUserId: string;
  // フラグメントの型を指定（マスク）
  initialMessages: FragmentType<typeof MessageRequestFragmentDoc>[];
}) {
  const {
    scrollerRef,
    bottomRef,
    onOwnMessageAdded,
    onAnyMessageAddedAtBottom,
  } = useMessageScroll();

  const { messages, loading, error } = useLiveMessages(roomId, currentUserId, {
    initialMessages,
    onOwnMessageAdded,
    onAnyMessageAddedAtBottom,
  });

  if (loading && !messages) return <div className="p-4">読み込み中…</div>;
  if (error)
    return <div className="p-4 text-red-600">エラー: {error.message}</div>;

  return (
    <div
      ref={scrollerRef}
      className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4"
    >
      {(messages ?? []).map((node) => {
        // フラグメントに書かれた型を使えるようにする（アンマスク）
        const m = getFragmentData(MessageRequestFragmentDoc, node);
        return (
          <MessageItem
            key={m!.id}
            name={m?.user?.name ?? "unknown"}
            message={m?.content ?? ""}
            isOwn={m?.user?.id === currentUserId}
          />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
