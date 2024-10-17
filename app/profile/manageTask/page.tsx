"use client";
import "./manageTask.scss";
import { useEffect, useState } from "react";
import { DataType } from "@/types/DataType";
import { useAppSelector } from "@/redux/hooks";
import { ExtendedCategoryTaskType } from "@/types/ExtendedCategoryTaskType";
import { ExtendedImportanceLevelTaskType } from "@/types/ExtendedImportanceLevelTaskType";
import { getUserId } from "@/redux/slices/userSlice/userSelectors";
import { getUserDoneTasks } from "@/redux/slices/userSlice/userSelectors";
import Select from "@/components/Select/Select";
import axios from "axios";
import Task from "@/components/Task/Task";
import Loader from "@/components/Loader/Loader";

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

const FULL_TASK_LVL_IMPORTANCE_LIST: ExtendedImportanceLevelTaskType[] = [
  ExtendedImportanceLevelTaskType.ALL,
  ExtendedImportanceLevelTaskType.NO_IMPORTANT,
  ExtendedImportanceLevelTaskType.LESS_IMPORTANT,
  ExtendedImportanceLevelTaskType.MEDIUM,
  ExtendedImportanceLevelTaskType.IMPORTANT,
  ExtendedImportanceLevelTaskType.VERY_IMPORTANT,
];

export default function ManageTask() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasksData, setTasksData] = useState<DataType[] | []>([]);
  const [currentCategory, setCurrentCategory] = useState(
    ExtendedCategoryTaskType.ALL
  );
  const [currentImportance, setCurrentImportance] = useState("all");
  const [currentTasksData, setCurrentTasksData] = useState<DataType[]>([]);
  const userId = useAppSelector(getUserId);
  const doneTasks = useAppSelector(getUserDoneTasks);

  const updateUserDoneTasksValue = async () => {
    try {
      const response = axios.put("/api/users/login", {
        userId: userId,
        doneTasks: doneTasks,
      });
    } catch (error) {
      console.log("something went wrong, we dont update your done tasks");
    }
  };
  const getFilteredTasks = () => {
    if (
      currentCategory === ExtendedCategoryTaskType.ALL &&
      currentImportance === ExtendedImportanceLevelTaskType.ALL
    ) {
      setCurrentTasksData(tasksData);
    } else {
      const categoryFilteredTasks = tasksData.filter((task: DataType) => {
        const categoryUpperCase = task.task.category.toUpperCase();
        const taskCategory = ExtendedCategoryTaskType[categoryUpperCase];
        return (
          currentCategory === taskCategory ||
          currentCategory === ExtendedCategoryTaskType.ALL
        );
      });
      const filteredTasks = categoryFilteredTasks.filter(
        (task: DataType) =>
          task.task.importanceLevel === currentImportance ||
          currentImportance === ExtendedImportanceLevelTaskType.ALL
      );
      setCurrentTasksData(filteredTasks);
    }
  };

  const getTask = async (userID: string) => {
    try {
      const response = await axios.get(
        // "https://notqe.vercel.app/api/usersTasks?email=test@test.com"
        `http://localhost:3000/api/usersTasks?userID=${userID}`
      );
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
      setIsLoading(false);
      getTask(userId);
    } else {
      console.log("we can not find your ID");
    }
  }, [userId]);

  useEffect(() => {
    updateUserDoneTasksValue();
  }, [doneTasks]);

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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="manage-tasks__tasks-container">
          <div className="manage-tasks__filters">
            <h2 className="manage_tasks__title">manage your tasks</h2>
            <Select
              data={FULL_TASK_CATEGORY_LIST}
              value={
                currentCategory === ExtendedCategoryTaskType.ALL
                  ? "default"
                  : currentCategory
              }
              onChange={(event) =>
                setCurrentCategory(
                  event.target.value as ExtendedCategoryTaskType
                )
              }
              placeholder="select category"
            />
            <Select
              data={FULL_TASK_LVL_IMPORTANCE_LIST}
              value={
                currentImportance === ExtendedImportanceLevelTaskType.ALL
                  ? "default"
                  : currentImportance
              }
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
      )}
    </div>
  );
}
