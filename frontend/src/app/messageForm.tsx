"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function MessageForm() {
  return (
    <form className="p-4 bg-white border-t flex gap-2">
      <Textarea
        placeholder="メッセージを書く"
        className="min-h-[30px] resize-none flex-1 rounded-xl border border-gray-500 text-gray-900"
      />
      <Button
        type="submit"
        className="rounded-xl bg-green-500 text-white"
      >
        <Send size={16} className="text-white" />
      </Button>
    </form>
  );
}
