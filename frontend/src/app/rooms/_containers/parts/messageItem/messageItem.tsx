// app/_containers/messageItem.tsx（プレゼンテーショナルのまま）
import Image from "next/image";
import { parseMessage } from "./parseMessage";

export default function MessageItem({
  name,
  message,
  isOwn = false,
}: {
  name: string;
  message: string;
  isOwn?: boolean;
}) {
  const parsed = parseMessage(message);

  return (
    <div
      className={`flex items-end gap-2 ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      {parsed.kind === "stamp" ? (
        <div className={`${isOwn ? "self-end mr-2" : "self-start ml-2"}`}>
          <Image
            src={parsed.src}
            alt="stamp"
            width={96}
            height={96}
            className="w-24 h-24 object-contain rounded-xl"
          />
        </div>
      ) : (
        <div
          className={`relative px-4 py-2 max-w-xs text-lg rounded-xl ${
            isOwn
              ? "bg-green-400 text-gray-600 self-end mr-2"
              : "bg-gray-200 text-gray-600 self-start ml-2"
          }`}
        >
          {!isOwn && <div className="text-xs mb-1">{name}</div>}
          <div>{parsed.text}</div>
        </div>
      )}
    </div>
  );
}
