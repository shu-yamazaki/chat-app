"use client";

import MessageItem from "./messageItem";
import DateSeparator from "./dataSeparator";

export default function MessageList() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <DateSeparator text="2025年7月29日（火）" />
      <MessageItem name="User1" message="こんにちは！" />
      <MessageItem name="Me" message="やっほー🙌" isOwn />
      <MessageItem name="User2" message="今日の予定どうする？" />
      <MessageItem name="Me" message="ランチ行こうよ🍽️" isOwn />
      <MessageItem name="User1" message="またね！" />
    </div>
  );
}
