"use client";

import React from "react";
import { GoSignOut } from "react-icons/go";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Signout = () => {
  const router = useRouter();

  const handleSignout = async () => {
    await fetch("http://localhost:3000/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/signin");
  };

  return (
    <Button
      variant="outline"
      className="flex items-center justify-between w-full"
      onClick={handleSignout}
    >
      <p className="text-slate-900">ログアウト</p>
      <GoSignOut className="text-slate-900" />
    </Button>
  );
};

export default Signout;
