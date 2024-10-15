import { ImportanceLevelTasksType } from "./ImportanceLevelTasksType";
import { CategoryTasksType } from "./CategoryTasksType";
export type TaskType = {
  title: string;
  description: string;
  category: CategoryTasksType;
  importanceLevel: ImportanceLevelTasksType;
};
