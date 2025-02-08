"use client";

import { Todo } from "@/app/types/types";
import StatusBadge from "@/components/StatusBadge";
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

const baseUrl =
  process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:3000";


const TodoDetail = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data, error, isLoading } = useSWR<Todo>(
    `${baseUrl}/api/todos/${id}`,
    fetcher
  );

  const handleDelete = async (id: number) => {
    await fetch(`${baseUrl}/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    mutate(`${baseUrl}/api/todos/${id}`);
    await router.push("/todos");
  };

  if (isLoading) return <p>データを読み込んでいます...</p>;

  if (error) return <p>エラーが発生しました: {error.message}</p>;

  if (!data) return <p>データが見つかりません</p>;

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
        <CardContent className="break-words">
          <StatusBadge text={todo.statuses.name} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-sm">
            期限：{format(new Date(todo.due_date), "yyyy/MM/dd")}
          </span>
          <div className="flex gap-1">
            <Link href={`/todos/${todo.id}/edit`}>
              <HiOutlinePencilAlt className="hover:opacity-70" />
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                {/* <Button variant="outline">Edit Profile</Button> */}
                <FaRegTrashAlt className="hover:opacity-70 cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>本当に削除してよろしいですか？</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-red-600"
                    onClick={() => handleDelete(todo.id)}
                  >
                    削除
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TodoDetail;
