import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const allBBSPosts = await prisma.todos.findMany();

  return NextResponse.json(allBBSPosts);
}

export async function POST(req: NextRequest) {
  const { title, content, due_date } = await req.json();

  const post = await prisma.todos.create({
    data: {
      title,
      content,
      due_date,
    },
  });

  return NextResponse.json(post);
}
