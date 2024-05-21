export type DoneTasksType = {
  health: number;
  work: number;
  study: number;
  other: number;
  noImportant: number;
  lesImportant: number;
  medium: number;
  important: number;
  veryImportant: number;
};

export type TaskType = {
  title: string;
  description: string;
  category: string;
  importance: string;
};

export interface TaskComponentType {
  task: TaskType;
  id: string;
  userId: string;
  handleUpdateTasks(id: string): void;
}
