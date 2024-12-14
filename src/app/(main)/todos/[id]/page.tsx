"use client";

import { Todo } from "@/app/types/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import useSWR from "swr";

const fetcher = async (url: string): Promise<Todo> => {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("データの取得に失敗しました");
  return response.json();
};

const TodoDetail = ({ params }: { params: { id: number } }) => {
  const { data, error, isLoading } = useSWR<Todo>(
    `http://localhost:3000/api/todos/${params.id}`,
    fetcher
  );

  if (isLoading) return <p>データを読み込んでいます...</p>;

  if (error) return <p>エラーが発生しました: {error.message}</p>;

  const todo = data!;

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <Card className="w-1/3 flex flex-col justify-center">
        <CardHeader>
          <CardTitle>
            <p>{todo.title}</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="break-words">
          <p>{todo.content}</p>
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
    </div>
  );
};

export default TodoDetail;
