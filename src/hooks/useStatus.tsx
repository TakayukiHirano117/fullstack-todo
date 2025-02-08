// src/hooks/useStatuses.ts
import useSWR from "swr";
import { Status } from "@/app/types/types";

const fetchStatuses = async (): Promise<{ statuses: Status[] }> => {
  const response = await fetch("http://localhost:3000/api/todos/create", {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("データの取得に失敗しました");
  return response.json();
};

export const useStatus = () => {
  const { data, error, isLoading } = useSWR<{ statuses: Status[] }>(
    "statuses",
    fetchStatuses
  );

  return {
    statuses: data?.statuses,
    error,
    isLoading,
  };
};
