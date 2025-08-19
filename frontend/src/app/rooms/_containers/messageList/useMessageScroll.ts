// スクロール位置を管理するフック

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export function useMessageScroll(opts?: { initialScroll?: boolean }) {
  const { initialScroll = true } = opts ?? {};
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const isAtBottomRef = useRef(true);

  // 表示されているスクロール領域で最下部が見えているか監視
  useEffect(() => {
    const root = scrollerRef.current;
    const target = bottomRef.current;
    if (!root || !target) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        setIsAtBottom(visible);
        isAtBottomRef.current = visible;
      },
      { root, threshold: 0.99 }
    );

    io.observe(target);
    return () => io.disconnect();
  }, []);

  // スクロール位置を最下部に移動
  const scrollToBottom = useCallback((smooth = true) => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end",
      });
    });
  }, []);

  // 初回マウント時に一度だけ最下部へ
  useLayoutEffect(() => {
    if (!initialScroll) return;
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ block: "end" });
    });
  }, [initialScroll]);

  // 自分のメッセージを送信した場合は最下部へスクロール
  const onOwnMessageAdded = useCallback(() => {
    scrollToBottom(true);
  }, [scrollToBottom]);

  // メッセージを受信した場合は最下部へスクロール
  const onAnyMessageAddedAtBottom = useCallback(() => {
    if (isAtBottomRef.current) scrollToBottom(true);
  }, [scrollToBottom]);

  return {
    scrollerRef,
    bottomRef,
    isAtBottom,
    isAtBottomRef,
    scrollToBottom,
    onOwnMessageAdded,
    onAnyMessageAddedAtBottom,
  };
}
