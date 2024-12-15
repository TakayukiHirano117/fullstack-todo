import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const statuses = await prisma.statuses.findMany();
    return NextResponse.json({ statuses });
}
