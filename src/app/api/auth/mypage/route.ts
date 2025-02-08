import { NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../../utils/supabase/server"
import prisma from "@/lib/prismaClient"

export const GET = async (req: NextRequest, res: NextResponse) => {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    console.log(user?.id)

    const publicUser = await prisma.users.findUnique({
        where: {
            id: user?.id,
        },
    })

    return NextResponse.json({ publicUser })
}

export const PUT = async (req: NextRequest, res: NextResponse) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { email, name } = await req.json();

  const publicUser = await prisma.users.update({
    where: {
      id: user?.id,
    },
    data: {
      email,
      name,
    },
  });

  console.log(publicUser);

  return NextResponse.json({ publicUser });
};
