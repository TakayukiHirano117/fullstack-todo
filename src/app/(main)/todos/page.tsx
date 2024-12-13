import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Todo } from "../types/types";
import { format } from "date-fns";
import axios from "axios";
// import { createClient } from '../../../../utils/supabase/client'

const AllTodos = async () => {
  // const supabase= await createClient()
  // const {
  //   data: { session },
  //   error,
  // } = await supabase.auth.getSession();

  // console.log(session)

  async function getAllTodos() {
    // const response = await fetch("http://localhost:3000/api/todos", {
    //   method: "GET",
    //   cache: "no-store",
    //   credentials: "include",
    // });

    const response = await axios.get("http://localhost:3000/api/todos")

    // console.log(response)
    
    // const allTodos = await response.json();
    // return allTodos;
    return response.data
  }

  const todos: Todo[] = await getAllTodos();

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-4 p-4 w-full ">
      {todos.map((todo) => (
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
  );
};

export default AllTodos;
