import prisma from "@/lib/prismaClient";
// import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {

  const cookieStore = await cookies();
  console.log("🚀 ~ createClient ~ cookieStore:", cookieStore.getAll());
  // const supabase = await createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // );

  const supabase = await createClient();

    // console.log(supabase.auth.user());

  const { data } = await supabase.auth.getUser();
  console.log(data);

  const allTodos = await prisma.todos.findMany();

  return NextResponse.json(allTodos, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(req: NextRequest) {
  const { title, content, due_date } = await req.json();

  // const supabase = await createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // );

  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();


  console.log(data);

  const post = await prisma.todos.create({
    data: {
      title,
      content,
      due_date,
      profile_id: data.user!.id,
    },
  });

  return NextResponse.json(post);
}
