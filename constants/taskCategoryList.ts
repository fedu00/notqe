import { ExtendedCategoryTaskType } from "@/types/ExtendedCategoryTaskType";

export const TASK_CATEGORY_LIST: Omit<
  ExtendedCategoryTaskType[],
  ExtendedCategoryTaskType.DEFAULT
> = [
  ExtendedCategoryTaskType.ALL,
  ExtendedCategoryTaskType.HEALTH,
  ExtendedCategoryTaskType.WORK,
  ExtendedCategoryTaskType.STUDY,
  ExtendedCategoryTaskType.OTHER,
];
