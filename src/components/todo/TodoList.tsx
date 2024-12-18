"use client";

import React from "react";
import useSWR, { mutate } from "swr";
import TodoCard from "./TodoCard";
import { Todo } from "@/app/types/types";
import SelectBox from "./SelectBox";
import PageTitle from "./PageTitle";
import { useRouter } from "next/navigation";

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) throw new Error("データの取得に失敗しました");
  return response.json();
};

const TodoList = () => {
  const router = useRouter();

  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>(
    `http://localhost:3000/api/todos?sort=${sortOrder}`,
    fetcher,
    { suspense: true, fallbackData: [] }
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 削除後にtodos全体を再フェッチ
    mutate(`http://localhost:3000/api/todos?sort=${sortOrder}`);

    // または、手動でページ遷移してリストをリロードする方法
    await router.push("/todos");
  };

  if (error) return <p>エラーが発生しました: {error.message}</p>;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <PageTitle text="✅ Todo一覧" />
        <SelectBox value={sortOrder} onChange={setSortOrder} />
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-4 w-full">
        {todos!.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
