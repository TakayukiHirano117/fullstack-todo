"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { format } from "date-fns";
import { Todo } from "@/app/types/types";

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    credentials: "same-origin",
  });
  if (!response.ok) throw new Error("データの取得に失敗しました");
  return response.json();
};

const AllTodos = () => {
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>("http://localhost:3000/api/todos", fetcher);

  if (isLoading) return <p>データを読み込んでいます...</p>;

  if (error) return <p>エラーが発生しました: {error.message}</p>;

  return (
    <div className="p-8 flex flex-col gap-8">
      <h1 className="text-4xl">✅ Todo一覧</h1>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-4 w-full">
        {todos!.map((todo) => (
          <Card
            key={todo.id}
            className="w-full h-64 flex flex-col justify-between"
          >
            <CardHeader>
              <CardTitle>
                <Link href={`/todos/${todo.id}`} className="hover:opacity-60">
                  {todo.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="break-words">
              <p>
                {todo.content.length > 30
                  ? `${todo.content.slice(0, 30)}...`
                  : todo.content}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm">
                期限：{format(new Date(todo.due_date), "yyyy/MM/dd")}
              </span>
              <div className="flex gap-1">
                <Link href={`/todos/${todo.id}/edit`}>
                  <HiOutlinePencilAlt className="hover:opacity-70" />
                </Link>
                <Link href={`/todos/${todo.id}/delete`}>
                  <FaRegTrashAlt className="hover:opacity-70" />
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllTodos;
