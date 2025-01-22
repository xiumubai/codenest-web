// import Image from "next/image";
"use client";

import Empty from "@/components/common/Empty";
export default function Page() {
  return (
    <div
      className="h-full
    "
    >
      <Empty
        title="暂无消息"
        description="还没有收到任何消息，去看看其他内容吧"
      />
    </div>
  );
}
