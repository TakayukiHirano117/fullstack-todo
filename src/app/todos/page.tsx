import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { HiOutlinePencilAlt } from 'react-icons/hi'

const Todos = () => {
    const todos = [
        {
            id: 1,
            title: 'todo1',
            content: "content1",
            dueDate: "2024/12/12"
        },
        {
            id: 2,
            title: 'todo2',
            content: "content2",
            dueDate: "2024/12/12"
        },
        {
            id: 3,
            title: 'todo3',
            content: "content3",
            dueDate: "2024/12/12"
        },
        {
            id: 4,
            title: 'todo4',
            content: "content4",
            dueDate: "2024/12/12"
        },
    ]

    return (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-4 p-4 w-full ">
            {
                todos.map((todo) => (
                    <Card key={todo.id} className="w-full">
                        <CardHeader>
                            <CardTitle>
                                <Link href={`/todos/${todo.id}`} className='hover:opacity-60'>{todo.title}</Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{todo.content}</p>
                        </CardContent>
                        <CardFooter className='flex justify-between'>
                            <span className='text-sm'>期限：{todo.dueDate}</span>
                            <div className='flex gap-1'>
                                {/* 編集と削除のアイコン */}
                                <Link href={`/todos/${todo.id}/edit`}>
                                    <HiOutlinePencilAlt className='hover:opacity-70' />
                                </Link>
                                <Link href={`/todos/${todo.id}/delete`}>
                                    <FaRegTrashAlt className='hover:opacity-70' />
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>

                ))
            }
        </div>
    )
}

export default Todos