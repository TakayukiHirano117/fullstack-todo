import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const todo = await prisma.todos.findUnique({
    where: { id: id },
    include: {
      statuses: true,
    }
  });

  console.log(todo);

  return NextResponse.json(todo);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = (await params).id;
  const { title, content, status_id, due_date } = await req.json();

  const todo = await prisma.todos.update({
    where: { id: id },
    data: {
      title,
      content,
      status_id,
      due_date,
    },
  });

  return NextResponse.json(todo);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const todo = await prisma.todos.delete({
    where: { id: id },
  });

  return NextResponse.json(todo);
}
