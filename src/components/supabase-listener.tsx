"use server"

import { createClient } from '@supabase/supabase-js';
import React from 'react'

const SupabaseListener = async () => {

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // セッションの取得
    const {
        data: { session },
    } = await supabase.auth.getSession()

    console.log(session)

    return (
        <div>SupabaseListerner</div>
    )
}

export default SupabaseListener