import { createClient } from '../../utils/supabase/server'
import Sidebar from './Sidebar'

const SupabaseListener = async () => {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <Sidebar user={user} />
    )
}

SupabaseListener.displayName = 'SupabaseListener'

export default SupabaseListener
