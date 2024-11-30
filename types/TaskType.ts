import { SelectCategoryTaskType } from "./SelectCategoryTaskType";
import { SelectImportanceLevelTasksType } from "./SelectImportanceLevelTasksType";
export type TaskType = {
  title: string;
  description: string;
  category: SelectCategoryTaskType;
  importanceLevel: SelectImportanceLevelTasksType;
};
