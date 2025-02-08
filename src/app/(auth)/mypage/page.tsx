"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

const baseUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:3000";

const fetcher = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("データの取得に失敗しました");
  return response.json();
};

const MyPage = () => {
  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "メールアドレスの形式が正しくありません" }),
    name: z
      .string()
      .min(1, { message: "名前は1文字以上で入力してください" })
      .max(20, { message: "名前は20文字以内で入力してください" }),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const { data, error, isLoading } = useSWR(
    `${baseUrl}/api/auth/mypage`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      form.reset({
        email: data.publicUser.email,
        name: data.publicUser.name || "",
      });
    }
  }, [data, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await fetch(`${baseUrl}/api/auth/mypage`, {
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl mb-8">マイページ</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/2"
          method="PUT"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input placeholder="メールアドレス" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名前</FormLabel>
                <FormControl>
                  <Input placeholder="名前" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">変更</Button>
        </form>
      </Form>
    </div>
  );
};

export default MyPage;
