// LINE風レイアウト：左にサイドナビ、中にタブ＋トーク一覧＋チャット

import SideNav from "./sideNav";
import TopTab from "./topTab";
import RoomList from "./roomList";
import ChatArea from "./chatArea";

export default function ChatPage() {
  return (
    <div className="flex h-screen w-full">
      <SideNav />
      <div className="flex flex-col flex-1">
        <TopTab />
        <div className="flex flex-1">
          <RoomList />
          <ChatArea />
        </div>
      </div>
    </div>
  );
}
