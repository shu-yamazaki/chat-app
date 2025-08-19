// メッセージの内容を解析して、テキストメッセージかスタンプかを判別する関数

export type ParsedMessage =
  | { kind: "text"; text: string }
  | { kind: "stamp"; src: string };

export function parseMessage(content: string): ParsedMessage {
  if (content.startsWith("stamp:")) {
    const src = content.slice("stamp:".length).trim();
    if (!src.startsWith("/")) return { kind: "text", text: "[invalid stamp]" };
    return { kind: "stamp", src };
  }
  return { kind: "text", text: content };
}
