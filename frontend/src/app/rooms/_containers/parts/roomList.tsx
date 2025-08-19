
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RoomList() {
  return (
    <div className="w-64 border-r bg-gray-600 flex flex-col">
      <div className="px-4 py-3 font-semibold text-lg border-b text-white">
        ルーム一覧
      </div>
      <ScrollArea className="flex-1">
        <ul className="divide-y divide-gray-500">
          <RoomListItem name="公開ルーム" message="公開ルームへようこそ！" />
          <RoomListItem
            name="秘密のルーム"
            message="秘密のルームへようこそ！"
          />
          <RoomListItem name="User1" message="こんにちは！" />
        </ul>
      </ScrollArea>
    </div>
  );
}

function RoomListItem({ name, message }: { name: string; message: string }) {
  return (
    <li className="p-4 hover:bg-gray-500 cursor-pointer text-white">
      <div className="font-bold">{name}</div>
      <div className="text-sm text-gray-300 truncate">{message}</div>
    </li>
  );
}
