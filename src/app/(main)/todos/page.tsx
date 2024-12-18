"use client";

import React, { Suspense } from "react";
import TodoList from "@/components/todo/TodoList";
import { AllTodosSkeleton } from "@/components/Skeleton";


const AllTodos = () => {
  return (
    <div className="p-8 flex flex-col gap-8">
      <Suspense fallback={<AllTodosSkeleton />}>
        <TodoList />
      </Suspense>
    </div>
  );
};

export default AllTodos;
