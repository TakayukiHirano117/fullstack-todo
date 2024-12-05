import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <div className='w-2/12 h-screen border-r flex flex-col p-2 relative bg-slate-800'>
            <div className='text-slate-50'>
                <span className='text-sm'>メールアドレス</span>
                <p className='text-lg'>ユーザー名</p>
            </div>
            <nav>
                <ul className='mt-4'>
                    <li className=''>
                        <Link href={"/todos"} className='text-slate-50 text-xl font-bold hover:text-slate-300'>All Todos</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar