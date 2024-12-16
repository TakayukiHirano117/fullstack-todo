import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export const GET = async () => {
    const statuses = await prisma.statuses.findMany();
    return NextResponse.json({ statuses });
}
