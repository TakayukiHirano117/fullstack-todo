export type Status = {
  id: number;
  name: string;
  color: string;
};

export interface Todo {
  id: number;
  title: string;
  content: string;
  due_date: Date;
  created_at: Date;
  updated_at: Date;
  status_id: string | null;
  user_id: string;
  statuses: Status;
}
