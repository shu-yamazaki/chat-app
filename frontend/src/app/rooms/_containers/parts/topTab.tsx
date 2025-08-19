
"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TopTab() {
  return (
    <Tabs defaultValue="all">
      <TabsList className="w-full flex justify-around bg-gray-100 rounded-none border-b border-gray-600">
        <TabsTrigger
          value="all"
          className="flex-1 rounded-none font-semibold data-[state=active]:!text-gray-900 data-[state=active]:!bg-gray-300"
        >
          すべて
        </TabsTrigger>
        <TabsTrigger
          value="friends"
          className="flex-1 rounded-none font-semibold data-[state=active]:!text-gray-900 data-[state=active]:!bg-gray-300"
        >
          友だち
        </TabsTrigger>
        <TabsTrigger
          value="groups"
          className="flex-1 rounded-none font-semibold data-[state=active]:!text-gray-900 data-[state=active]:!bg-gray-300"
        >
          グループ
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
