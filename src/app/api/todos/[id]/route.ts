import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const todo = await prisma.todos.findUnique({
    where: { id: parseInt(id) },
  });

  return NextResponse.json(todo);
}
