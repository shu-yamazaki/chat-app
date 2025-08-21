// メッセージが表示されるチャットエリアのコンポーネント

import MessageList from "../messageList/messageList";
import MessageForm from "../messageForm/messageForm";
import { serverFetchRoomMessages } from "@/app/rooms/_containers/chatArea/serverFetchRoomMessages";

export default async function ChatArea({
  roomId,
  currentUserId,
}: {
  roomId: string;
  currentUserId: string;
}) {
  const initialMessages = await serverFetchRoomMessages(roomId);

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0">
      <div className="px-4 py-3 text-lg font-bold text-gray-900 sticky top-0 z-10">
        Chat
      </div>
      <MessageList
        roomId={roomId}
        currentUserId={currentUserId}
        initialMessages={initialMessages}
      />
      <MessageForm roomId={roomId} currentUserId={currentUserId} />
    </div>
  );
}
