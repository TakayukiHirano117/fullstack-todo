import prisma from "@/lib/prismaClient";
// import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  
  const cookieStore = await cookies();
  console.log("🚀 ~ createClient ~ cookieStore:", cookieStore.getAll());

  const supabase = await createClient();

  // console.log(await supabase.auth.getUser());

  // const { data, error } = await supabase.auth.getUser();

  // console.log(error);
  // console.log(data);
  const allTodos = await prisma.todos.findMany();

  return NextResponse.json(allTodos, {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000", // クライアントのURL
      "Access-Control-Allow-Credentials": "true", // クッキー送信を許可
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
