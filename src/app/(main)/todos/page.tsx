"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { format } from "date-fns";
import { Todo } from "@/app/types/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import StatusBadge from "@/components/StatusBadge";

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) throw new Error("データの取得に失敗しました");
  return response.json();
};

const sortSchema = z.object({
  sortOrder: z.enum(["asc", "desc"], {
    required_error: "並べ替え順を選択してください",
  }),
});

type SortFormData = z.infer<typeof sortSchema>;

const AllTodos = () => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SortFormData>({
    resolver: zodResolver(sortSchema),
    defaultValues: {
      sortOrder: "asc",
    },
  });

  const sortOrder = watch("sortOrder");

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    mutate(`http://localhost:3000/api/todos?sort=${sortOrder}`);
  };

  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>(
    `http://localhost:3000/api/todos?sort=${sortOrder}`,
    fetcher
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>エラーが発生しました: {error.message}</p>;

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">✅ Todo一覧</h1>
        <Select
          onValueChange={(value) =>
            setValue("sortOrder", value as "asc" | "desc")
          }
          value={sortOrder}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="並べ替え" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>並べ替え</SelectLabel>
              <SelectItem value="asc">作成日の昇順</SelectItem>
              <SelectItem value="desc">作成日の降順</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-4 w-full">
        {todos!.map((todo) => (
          <Card
            key={todo.id}
            className="w-full h-64 flex flex-col justify-between"
          >
            <CardHeader>
              <CardTitle>
                <Link href={`/todos/${todo.id}`} className="hover:opacity-60">
                  <p className="truncate">{todo.title}</p>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="break-words">
              <p className="truncate">{todo.content}</p>
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
                {/* <Link href={`/todos/${todo.id}/delete`}>
                  <FaRegTrashAlt className="hover:opacity-70" />
                </Link> */}
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
        ))}
      </div>
    </div>
  );
};

export default AllTodos;
