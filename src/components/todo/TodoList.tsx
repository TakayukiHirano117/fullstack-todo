"use client";

import React from "react";
import useSWR, { mutate } from "swr";
import TodoCard from "./TodoCard";
import { Todo } from "@/app/types/types";
import SelectBox from "./SelectBox";
import PageTitle from "./PageTitle";

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
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<Todo[]>(
    `http://localhost:3000/api/todos?sort=${sortOrder}`,
    fetcher,
    { suspense: true }
  );

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
            onDelete={() => mutate("http://localhost:3000/api/todos")}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
