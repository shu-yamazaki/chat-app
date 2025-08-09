
import MessageList from "./messageList";
import MessageForm from "./messageForm";

export default function ChatArea() {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* ヘッダー */}
      <div className="px-4 py-3 text-lg font-bold text-gray-900 sticky top-0 z-10">
        User1
      </div>
      <MessageList />
      <MessageForm />
    </div>
  );
}
