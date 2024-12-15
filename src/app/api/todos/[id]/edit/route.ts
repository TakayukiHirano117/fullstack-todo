import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  const todo = await prisma.todos.findUnique({
    where: { id: id },
  });

  // console.log(todo);
  console.log(todo!.id);

  return NextResponse.json(todo);
};