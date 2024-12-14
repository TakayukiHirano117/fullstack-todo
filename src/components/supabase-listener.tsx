"use server"

// import { createClient } from '@supabase/supabase-js';
import React from 'react'
import { createClient } from '../../utils/supabase/server'
import Sidebar from './Sidebar'

const SupabaseListener = async () => {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    console.log(user)

    return (
        <Sidebar user={user} />
    )
}

export default SupabaseListener
