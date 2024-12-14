import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React from "react";

const Sidebar = ({ user }: { user: User | null }) => {
  return (
    <div className="w-2/12 h-screen border-r flex flex-col p-3 relative bg-slate-800 justify-between">
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
                className="text-slate-50 text-xl font-bold hover:text-slate-300 duration-300"
              >
                Todo一覧
              </Link>
            </li>
            <li className="">
              <Link
                href={"/todos/create"}
                className="text-slate-50 text-xl font-bold hover:text-slate-300 duration-300"
              >
                Todo作成
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="text-slate-50 mb-4 flex flex-col gap-2">
        <hr />
        <span className="text-sm">{user ? user.email : ""}</span>
        {/* <p className="text-lg">{user.name ? user.name : "匿名ユーザー"}</p> */}
      </div>
    </div>
  );
};

export default Sidebar;
