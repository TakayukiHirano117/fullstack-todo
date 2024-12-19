"use client";

import React, { Suspense } from "react";
import TodoList from "@/components/todo/TodoList";
import { AllTodosSkeleton } from "@/components/Skeleton";
import { ErrorBoundary } from "react-error-boundary";

const AllTodos = () => {
  return (
    <div className="p-8">
      <ErrorBoundary fallback={<p>エラーが発生しました</p>}>
        <Suspense fallback={<AllTodosSkeleton />}>
          <TodoList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default AllTodos;
