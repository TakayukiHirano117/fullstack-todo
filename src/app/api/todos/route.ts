import prisma from "@/lib/prismaClient";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const allTodos = await prisma.todos.findMany();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const {data} = await supabase.auth.getUser();
  console.log(data);

  return NextResponse.json(allTodos);
}

export async function POST(req: NextRequest) {
  console.log(req);
  const { title, content, due_date } = await req.json();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase.auth.getUser();
  console.log(data);

  const post = await prisma.todos.create({
    data: {
      title,
      content,
      due_date,
      // profile_id: user.id,
    },
  });

  return NextResponse.json(post);
}
