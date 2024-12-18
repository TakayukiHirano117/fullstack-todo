"use client";

import { Todo } from "@/app/types/types";
import StatusBadge from "@/components/StatusBadge";
import TodoCard from "@/components/todo/TodoCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import useSWR, { mutate } from "swr";

const fetcher = async (url: string): Promise<Todo> => {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("データの取得に失敗しました");
  return response.json();
};

const TodoDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data, error, isLoading } = useSWR<Todo>(
    `http://localhost:3000/api/todos/${id}`,
    fetcher
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    mutate(`http://localhost:3000/api/todos/${id}`);
    await router.push("/todos");
  };

  if (isLoading) return <p>データを読み込んでいます...</p>;

  if (error) return <p>エラーが発生しました: {error.message}</p>;

  if (!data) return <p>データが見つかりません</p>;

  const todo = data!;

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-1/3 flex flex-col justify-center">
        <TodoCard
          key={todo.id}
          todo={todo}
          onDelete={() => mutate("http://localhost:3000/api/todos")}
        />
      </div>
    </div>
  );
};

export default TodoDetail;
