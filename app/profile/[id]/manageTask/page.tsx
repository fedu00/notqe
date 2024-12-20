"use client";
import "./manageTask.scss";
import { useEffect, useState } from "react";
import { DataType } from "@/types/DataType";
import { ExtendedCategoryTaskType } from "@/types/ExtendedCategoryTaskType";
import { ExtendedImportanceLevelTaskType } from "@/types/ExtendedImportanceLevelTaskType";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUserDetails } from "@/redux/slices/userSlice/userThunk/fetchUserDetails";
import Select from "@/components/Select/Select";
import clientApi from "@/apiClients/clientApi";
import Task from "@/components/Task/Task";

const FULL_TASK_CATEGORY_LIST: Omit<
  ExtendedCategoryTaskType[],
  ExtendedCategoryTaskType.DEFAULT
> = [
  ExtendedCategoryTaskType.ALL,
  ExtendedCategoryTaskType.HEALTH,
  ExtendedCategoryTaskType.WORK,
  ExtendedCategoryTaskType.STUDY,
  ExtendedCategoryTaskType.OTHER,
];

const FULL_TASK_LVL_IMPORTANCE_LIST: Omit<
  ExtendedImportanceLevelTaskType[],
  ExtendedImportanceLevelTaskType.DEFAULT
> = [
  ExtendedImportanceLevelTaskType.ALL,
  ExtendedImportanceLevelTaskType.NO_IMPORTANT,
  ExtendedImportanceLevelTaskType.LESS_IMPORTANT,
  ExtendedImportanceLevelTaskType.MEDIUM,
  ExtendedImportanceLevelTaskType.IMPORTANT,
  ExtendedImportanceLevelTaskType.VERY_IMPORTANT,
];

export default function ManageTask() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const userId: string = params.id as string;
  const [tasksData, setTasksData] = useState<DataType[] | []>([]);
  const [currentCategory, setCurrentCategory] = useState(
    ExtendedCategoryTaskType.DEFAULT
  );
  const [currentImportance, setCurrentImportance] = useState(
    ExtendedImportanceLevelTaskType.DEFAULT
  );
  const [currentTasksData, setCurrentTasksData] = useState<DataType[]>([]);

  const getFilteredTasks = () => {
    const showAllCategory =
      currentCategory === ExtendedCategoryTaskType.ALL ||
      currentCategory === ExtendedCategoryTaskType.DEFAULT;

    const showAllImportanceLevel =
      currentImportance === ExtendedImportanceLevelTaskType.ALL ||
      currentImportance === ExtendedImportanceLevelTaskType.DEFAULT;
    if (showAllCategory && showAllImportanceLevel) {
      setCurrentTasksData(tasksData);
    } else {
      const categoryFilteredTasks = tasksData.filter(({ task }: DataType) => {
        const categoryUpperCase = task.category.toUpperCase();
        const taskCategory = ExtendedCategoryTaskType[categoryUpperCase];
        return (
          currentCategory === taskCategory ||
          currentCategory === ExtendedCategoryTaskType.ALL ||
          currentCategory === ExtendedCategoryTaskType.DEFAULT
        );
      });
      const filteredTasks = categoryFilteredTasks.filter(
        ({ task }: DataType) => {
          const importanceLevelUpperCase = task.importanceLevel.toUpperCase();
          const importanceLevelKey = importanceLevelUpperCase.replace(
            / /g,
            "_"
          );
          const taskImportance =
            ExtendedImportanceLevelTaskType[importanceLevelKey];
          return (
            currentImportance === taskImportance ||
            currentImportance === ExtendedImportanceLevelTaskType.ALL ||
            currentImportance === ExtendedImportanceLevelTaskType.DEFAULT
          );
        }
      );
      setCurrentTasksData(filteredTasks);
    }
  };

  const getTask = async (userID: string) => {
    try {
      const response = await clientApi.get(`/usersTasks`, {
        params: { userID },
      });
      const dataTasks: { myTasks: DataType[] | [] } = await response.data;
      setTasksData(dataTasks.myTasks);
      return response;
    } catch (error: any) {
      console.log("you can not get tasks", error);
    }
  };

  const handleUpdateTasks = (id: string): void => {
    const newTasksData: DataType[] | [] = currentTasksData.filter(
      (task) => task._id !== id
    );
    setCurrentTasksData(newTasksData);
  };

  useEffect(() => {
    getFilteredTasks();
  }, [currentCategory, tasksData, currentImportance]);

  useEffect(() => {
    if (userId != null && userId != "") {
      getTask(userId);
    } else {
      console.log("we can not find your ID");
    }
  }, [userId]);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);

  const emptyTasksData = tasksData.length === 0;
  if (emptyTasksData) {
    return (
      <div>
        <div className="manage-tasks--empty">
          <h3>You don't have any tasks yet</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-tasks">
      <div className="manage-tasks__tasks-container">
        <div className="manage-tasks__filters">
          <h2 className="manage-tasks__title">manage your tasks</h2>
          <Select
            data={FULL_TASK_CATEGORY_LIST}
            value={currentCategory}
            onChange={(event) =>
              setCurrentCategory(event.target.value as ExtendedCategoryTaskType)
            }
            placeholder="select category"
          />
          <Select
            data={FULL_TASK_LVL_IMPORTANCE_LIST}
            value={currentImportance}
            onChange={(event) =>
              setCurrentImportance(
                event.target.value as ExtendedImportanceLevelTaskType
              )
            }
            placeholder="select task importance"
          />
        </div>
        <div className="manage-tasks__tasks-list theme-background">
          {currentTasksData.length > 0 ? (
            currentTasksData.map((task: DataType) => (
              <Task
                key={task._id}
                id={task._id}
                task={task.task}
                userID={userId!}
                handleUpdateTasks={handleUpdateTasks}
                setTasksData={setTasksData}
              />
            ))
          ) : (
            <p>you don't have such tasks</p>
          )}
        </div>
      </div>
    </div>
  );
}
