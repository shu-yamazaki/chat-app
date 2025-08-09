
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  name: string;
  message: string;
  isOwn?: boolean;
};

export default function MessageItem({ name, message, isOwn = false }: Props) {
  return (
    <div
      className={`flex items-end gap-2 ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      {!isOwn && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col items-end">
        <div
          className={`relative px-4 py-2 max-w-xs text-lg rounded-xl ${
            isOwn
              ? "bg-green-400 text-gray-600 self-end mr-2 after:absolute after:content-[''] after:right-[-6px] after:top-1 after:w-3 after:h-3 after:bg-green-400 after:rounded-br-full"
              : "bg-gray-200 text-gray-600 self-start ml-2 after:absolute after:content-[''] after:left-[-6px] after:top-1 after:w-3 after:h-3 after:bg-gray-200 after:rounded-bl-full"
          }`}
        >
          {!isOwn && <div className="text-xs mb-1">{name}</div>}
          <div>{message}</div>
        </div>

        {isOwn && (
          <div className="text-xs text-gray-500 mt-1 mr-2 flex gap-1 items-center">
            <span>12:34</span>
            <span>既読</span>
          </div>
        )}
      </div>

      {isOwn && <div className="w-8 h-8" />}
    </div>
  );
}
