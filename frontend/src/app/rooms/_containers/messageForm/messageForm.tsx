"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useSendMessage } from "@/app/rooms/_containers/messageForm/useSendMessage";

export default function MessageForm({
  roomId,
  currentUserId,
}: {
  roomId: string;
  currentUserId: string;
}) {
  const [content, setContent] = useState("");
  const { sendText, sendStamp, loading } = useSendMessage(
    roomId,
    currentUserId
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendText(content);
    setContent("");
  };

  return (
    <form className="p-4 bg-white border-t flex gap-2" onSubmit={onSubmit}>
      <Textarea
        placeholder="メッセージを書く"
        className="min-h-[30px] resize-none flex-1 rounded-xl border border-gray-500 text-gray-900"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        type="button"
        onClick={() => sendStamp("/favicon.ico")}
        className="rounded-xl bg-gray-600"
        disabled={loading}
      >
        🙂
      </Button>
      <Button
        type="submit"
        className="rounded-xl bg-green-500 text-white"
        disabled={loading}
      >
        <Send size={16} className="text-white" />
      </Button>
    </form>
  );
}
