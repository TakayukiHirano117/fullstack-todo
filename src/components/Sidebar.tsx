import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React from "react";
import Signout from "./auth/Signout";
import { CiMenuKebab } from "react-icons/ci";
import { LuListTodo } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";

const Sidebar = ({ user }: { user: User | null }) => {
  return (
    <div className="w-2/12 h-screen border-r flex flex-col p-3 relative bg-slate-800 justify-between sticky top-0">
      <div>
        <div className="my-4">
          <Link href={"/"}>
            <h1 className="text-slate-50 text-2xl font-black">
              Fullstack Todo
            </h1>
          </Link>
        </div>
        <hr />
        <nav className="mt-4">
          <ul className="mt-4 flex flex-col gap-2">
            <li className="">
              <Link
                href={"/todos"}
                className="text-slate-50 lg:text-xl md:text-sm font-bold duration-300 flex items-center gap-2 hover:bg-slate-700 py-1 px-2 rounded-full"
              >
                <LuListTodo className="text-slate-50" />
                Todo一覧
              </Link>
            </li>
            <li className="">
              <Link
                href={"/todos/create"}
                className="text-slate-50 lg:text-xl md:text-sm font-bold duration-300 flex items-center gap-2 hover:bg-slate-700 py-1 px-2 rounded-full"
              >
                <IoCreateOutline className="text-slate-50" />
                Todo作成
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="text-slate-50 mb-4 flex flex-col gap-4">
        <span className="text-sm">
          {user ? (
            <div className="">
              <hr />
              <div className="flex flex-col gap-2 my-2">
                <div className="flex items-center justify-between">
                  <p>{user.email}</p>
                  <Link
                    href={"/mypage"}
                    className="p-2 rounded-full cursor-pointer hover:bg-slate-500 duration-300"
                  >
                    <CiMenuKebab />
                  </Link>
                </div>
                <Signout />
              </div>
            </div>
          ) : (
            ""
          )}
        </span>

        {/* <p className="text-lg">{user.name ? user.name : "匿名ユーザー"}</p> */}
      </div>
    </div>
  );
};

export default Sidebar;
