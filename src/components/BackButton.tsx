"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { IoIosArrowBack } from "react-icons/io";

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button variant="link" onClick={handleBack}>
      <IoIosArrowBack />
      戻る
    </Button>
  );
};

export default BackButton;
