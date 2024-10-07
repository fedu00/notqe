import { ExtendedImportanceLevelTaskType } from "@/types/ExtendedImportanceLevelTaskType";

export const TASK_LVL_IMPORTANCE_LIST: Omit<
  ExtendedImportanceLevelTaskType[],
  ExtendedImportanceLevelTaskType.DEFAULT
> = [
  ExtendedImportanceLevelTaskType.NO_IMPORTANT,
  ExtendedImportanceLevelTaskType.LESS_IMPORTANT,
  ExtendedImportanceLevelTaskType.MEDIUM,
  ExtendedImportanceLevelTaskType.IMPORTANT,
  ExtendedImportanceLevelTaskType.VERY_IMPORTANT,
];
