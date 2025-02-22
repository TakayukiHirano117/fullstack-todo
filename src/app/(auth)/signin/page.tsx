'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const baseUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:3000";

const Signin = () => {
  
  const formSchema = z.object({
    email: z.string()
      .email({ message: 'メールアドレスの形式が正しくありません' }),
    password: z.string()
      .min(8, { message: 'パスワードは8文字以上で入力してください' }),
  })
  
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // onSubmitごとカスタムフックにしなくてはいけない。
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await fetch(`${baseUrl}/api/auth/signin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-8 w-1/2">
      <div className="flex justify-between my-2 items-center">
        <h1 className="text-4xl">ログイン</h1>
        <Link href={"/signup"} className="text-blue-500 underline hover:text-blue-900 duration-300 text-lg">
          ユーザー登録がまだの方はこちら
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="メールアドレス" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="パスワード" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default Signin
