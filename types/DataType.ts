import { TaskType } from "./TaskType";

export interface DataType {
  createdAt: string;
  task: TaskType;
  updatedAt: string;
  userID: string;
  _id: string;
}
