import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../utils/supabase/server";

export const POST = async (req: NextRequest) => {
    const { email, password } = await req.json();

    // console.log(req)
    console.log(req.cookies.getAll());

    const supabase = await createClient();

    // console.log(await supabase.auth.getUser());

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });


    // console.log(await supabase.auth.getUser())

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user });
}