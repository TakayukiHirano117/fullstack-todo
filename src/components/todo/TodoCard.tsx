"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { format } from "date-fns";
import StatusBadge from "@/components/StatusBadge";
import { Todo } from "@/app/types/types";

type TodoCardProps = {
  todo: Todo;
  onDelete: () => void;
};

const TodoCard: React.FC<TodoCardProps> = ({ todo, onDelete }) => {
//   const handleDelete = async () => {
//     await fetch(`http://localhost:3000/api/todos/${todo.id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     onDelete();
//   };

  return (
    <Card className="w-full h-64 flex flex-col justify-between">
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
          <Dialog>
            <DialogTrigger asChild>
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
                  onClick={onDelete}
                >
                  削除
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
