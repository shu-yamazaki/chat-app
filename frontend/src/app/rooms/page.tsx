import SideNav from "./_containers/parts/sideNav";
import TopTab from "./_containers/parts/topTab";
import RoomList from "./_containers/parts/roomList";
import ChatArea from "./_containers/chatArea/chatArea";

const ROOM_ID = "0ca48bc5-b89b-4c33-8e89-b5bec4b7e699";
const ADMIN_ID = "0cedc0ad-64ee-44f4-913f-d26e8ba01d32";
const USER2_ID = "684737d9-d3e2-4aa9-bcc6-68999e044f9d";

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ user?: string }>;
}) {
  const { user } = await searchParams;
  const currentUserId = user === "user2" ? USER2_ID : ADMIN_ID;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideNav />
      <div className="flex flex-col flex-1 min-h-0">
        <TopTab />
        <div className="flex flex-1 min-h-0">
          <RoomList />
          <ChatArea roomId={ROOM_ID} currentUserId={currentUserId} />
        </div>
      </div>
    </div>
  );
}
