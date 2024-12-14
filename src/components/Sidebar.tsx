import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <div className='w-2/12 h-screen border-r flex flex-col p-2 relative bg-slate-800'>
            <div className='my-4'>
                <Link href={"/"}>
                    <h1 className='text-slate-50 text-2xl'>Fullstack Todo</h1>
                </Link>
            </div>
            <div className='text-slate-50'>
                <span className='text-sm'>メールアドレス</span>
                <p className='text-lg'>ユーザー名</p>
            </div>
            <nav className='mt-4'>
                <ul className='mt-4 flex flex-col gap-2'>
                    <li className=''>
                        <Link href={"/todos"} className='text-slate-50 text-xl font-bold hover:text-slate-300'>Todo一覧</Link>
                    </li>
                    <li className=''>
                        <Link href={"/todos/create"} className='text-slate-50 text-xl font-bold hover:text-slate-300'>Todo作成</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar