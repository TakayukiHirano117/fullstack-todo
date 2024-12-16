import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";

export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams
  const sortOrder = searchParams.get("sort") || "asc";
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const allTodos = await prisma.todos.findMany({
    where: {
      user_id: data.user!.id,
    },
    orderBy: {
      created_at: sortOrder as "asc" | "desc",
    },
  });

  return NextResponse.json(allTodos, {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export async function POST(req: NextRequest) {
  const { title, content, status_id, due_date } = await req.json();

  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const post = await prisma.todos.create({
    data: {
      title,
      content,
      due_date,
      status_id,
      user_id: data.user!.id,
    },
  });

  return NextResponse.json(post);
}
