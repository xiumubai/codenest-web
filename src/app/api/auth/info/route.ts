import { NextResponse } from "next/server";
import { http } from "@/lib/http";
import type { User } from "@/types/user";

export async function GET() {
  try {
    // 调用后端接口获取用户信息
    const data = await http.get<User>("/user/info");

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Get user info error:", error);
    return NextResponse.json(
      { message: error.message || "获取用户信息失败" },
      { status: error.status || 500 }
    );
  }
}
