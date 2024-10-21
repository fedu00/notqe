import { CategoryTasksType } from "./CategoryTasksType";

export enum ExtendedCategoryTaskType {
  ALL = "all",
  DEFAULT = "default",
  HEALTH = CategoryTasksType.HEALTH,
  WORK = CategoryTasksType.WORK,
  STUDY = CategoryTasksType.STUDY,
  OTHER = CategoryTasksType.OTHER,
}
