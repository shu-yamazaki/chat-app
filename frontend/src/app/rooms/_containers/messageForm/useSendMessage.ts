import { useMutation } from "@apollo/client";
import { CreateMessage } from "@/app/rooms/_lib/gql/messages";

export function useSendMessage(roomId: string, currentUserId: string) {
  const [mutate, { loading, error }] = useMutation(CreateMessage);

  // テキストメッセージを送信する関数
  const sendText = async (text: string) => {
    const content = text.trim();
    if (!content) return;
    await mutate({
      variables: { input: { roomId, senderId: currentUserId, content } },
    });
  };

  // スタンプを送信する関数
  const sendStamp = async (path: string) => {
    await mutate({
      variables: {
        input: { roomId, senderId: currentUserId, content: `stamp:${path}` },
      },
    });
  };

  return { sendText, sendStamp, loading, error };
}
