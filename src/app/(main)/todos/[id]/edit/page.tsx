"use client";

import { Status, Todo } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BackButton from "@/components/BackButton";

const fetcher = async (
  url: string
): Promise<{
  todo: Todo;
  statuses: Status[];
}> => {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("データの取得に失敗しました");
  return response.json();
};

const EditTodos = () => {
  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: "タイトルは1文字以上で入力してください" })
      .max(50, { message: "タイトルは50文字以内で入力してください" }),
    content: z
      .string()
      .min(1, { message: "本文は1文字以上で入力してください" })
      .max(100, { message: "本文は100文字以内で入力してください" }),
    status_id: z.string({
      required_error: "選択肢を選んでください",
    }),
    due_date: z
      .date()
      .refine((date) => new Date(new Date().setHours(0, 0, 0, 0)), {
        message: "未来の日付を入力してください",
      }),
  });

  const { id } = useParams();
  const router = useRouter();

  const { data, error, isLoading } = useSWR<{
    todo: Todo;
    statuses: Status[];
  }>(`http://localhost:3000/api/todos/${id}/edit`, fetcher);

  const statuses = data?.statuses || [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      status_id: "",
      due_date: new Date(),
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.todo.title,
        content: data.todo.content,
        status_id: data.todo.status_id ?? "",
        due_date: new Date(data.todo.due_date),
      });
    }
  }, [data, form]);

  if (isLoading) return <p>データを読み込んでいます...</p>;
  if (error) return <p>エラーが発生しました: {error.message}</p>;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      router.push("/todos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl mb-8">✅ Todo編集</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/2"
          method="PUT"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タイトル</FormLabel>
                <FormControl>
                  <Input placeholder="タイトル" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>本文</FormLabel>
                <FormControl>
                  <Input placeholder="本文" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status_id"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel>ステータス</FormLabel>
                </div>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)} // React Hook Form の field に値を反映
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>ステータス</SelectLabel>
                        {statuses.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="due_date"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel>期限</FormLabel>
                </div>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>日付を選択してください</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="flex justify-end">
        <BackButton />
      </div>
    </div>
  );
};

export default EditTodos;
