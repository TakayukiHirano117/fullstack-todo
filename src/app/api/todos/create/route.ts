import prisma from "@/lib/prismaClient";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    // prismaでstatusesテーブルから全てのデータを取得
    // prisma.schemaにstatusesテーブルの記述を追記、todosテーブルにstatus_idを追加
    const statuses = await prisma.statuses.findMany();
}