import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const todo = await prisma.todos.findUnique({
    where: { id: id },
  });

  const statuses = await prisma.statuses.findMany();

  return NextResponse.json({ todo, statuses });
};
