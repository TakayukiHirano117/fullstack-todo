"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectBoxProps = {
  value: "asc" | "desc";
  onChange: (value: "asc" | "desc") => void;
};

const SelectBox: React.FC<SelectBoxProps> = ({ value, onChange }) => {
  return (
    <Select
      onValueChange={(value) => onChange(value as "asc" | "desc")}
      value={value}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="並べ替え" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>並べ替え</SelectLabel>
          <SelectItem value="asc">作成日の昇順</SelectItem>
          <SelectItem value="desc">作成日の降順</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
