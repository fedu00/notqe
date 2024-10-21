import { ImportanceLevelTasksType } from "./ImportanceLevelTasksType";

export enum ExtendedImportanceLevelTaskType {
  ALL = "all",
  DEFAULT = "default",
  NO_IMPORTANT = ImportanceLevelTasksType.NO_IMPORTANT,
  LESS_IMPORTANT = ImportanceLevelTasksType.LESS_IMPORTANT,
  MEDIUM = ImportanceLevelTasksType.MEDIUM,
  IMPORTANT = ImportanceLevelTasksType.IMPORTANT,
  VERY_IMPORTANT = ImportanceLevelTasksType.VERY_IMPORTANT,
}
