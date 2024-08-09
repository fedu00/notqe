"use client";
import Select from "@/components/Select/Select";
import styles from "./manageTask.module.css";
import { useEffect, useState } from "react";
import { CATEGORY_DATA, ALL_TASKS_IMPORTANCE_DATA } from "@/constans/constans";
import { TaskType } from "@/types/types";
import { useDarkModeContext } from "@/context/userContext";
import axios from "axios";
import Task from "@/components/Task/Task";
import ClipLoader from "react-spinners/ClipLoader";

interface DataType {
  createdAt: string;
  task: TaskType;
  updatedAt: string;
  userID: string;
  _id: string;
}

export default function ManageTask() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userID, setUserID] = useState<string>("");
  const [data, setData] = useState<DataType[] | []>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [currentImportance, setCurrentImportance] = useState<string>("all");
  const [currentTasksData, setCurrentTasksData] = useState<DataType[] | []>([]);
  const { darkMode } = useDarkModeContext();

  const getTask = async (userID: string) => {
    try {
      const response = await axios.get(
        // "https://notqe.vercel.app/api/usersTasks?email=test@test.com"
        `http://localhost:3000/api/usersTasks?userID=${userID}`
      );
      const dataTasks: { myTasks: DataType[] | [] } = await response.data;

      setData(dataTasks.myTasks);
      return response;
    } catch (error: any) {
      console.log("you can not get tasks", error);
    }
  };

  useEffect(() => {
    if (currentCategory === "all" && currentImportance === "all") {
      setCurrentTasksData(data);
    } else {
      const categoryFilteredTasks = data.filter(
        (task: DataType) =>
          task.task.category === currentCategory || currentCategory === "all"
      );
      const filteredTasks = categoryFilteredTasks.filter(
        (task: DataType) =>
          task.task.importance === currentImportance ||
          currentImportance === "all"
      );
      setCurrentTasksData(filteredTasks);
    }
  }, [currentCategory, data, currentImportance]);

  useEffect(() => {
    const userID: string | null = sessionStorage.getItem("userID");

    if (userID != null && userID != "") {
      setUserID(userID);
      setIsLoading(false);
      getTask(userID);
    } else {
      console.log("we can not find your ID");
    }
  }, []);

  const handleUpdateTasks = (id: string): void => {
    const newTasksData: DataType[] | [] = currentTasksData.filter(
      (task) => task._id !== id
    );
    setCurrentTasksData(newTasksData);
  };

  const emptyTasksData: boolean = data.length === 0;

  if (emptyTasksData) {
    return (
      <div className="manage_task_container">
        <div className="title_container">
          <h1>You don't have any tasks yet </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.manage_tasks_page_container} ${
        darkMode && styles.manage_tasks_page_container_dark
      } `}
    >
      {isLoading ? (
        <ClipLoader
          color={"#ffa868"}
          loading={true}
          size={60}
          speedMultiplier={0.4}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className={styles.manage_task_container}>
          <div>
            <h1
              className={`${styles.manage_tasks_title} ${
                darkMode && styles.manage_tasks_title_dark
              } `}
            >
              manage your tasks
            </h1>
            <Select
              data={CATEGORY_DATA}
              value={currentCategory === "all" ? "default" : currentCategory}
              onChange={(event) => setCurrentCategory(event.target.value)}
              placeholder="select category"
              darkMode={darkMode}
            />
            <Select
              data={ALL_TASKS_IMPORTANCE_DATA}
              value={
                currentImportance === "all" ? "default" : currentImportance
              }
              onChange={(event) => setCurrentImportance(event.target.value)}
              placeholder="select task importance"
              darkMode={darkMode}
            />
          </div>
          <div
            className={`${styles.tasks_container} ${
              darkMode && styles.tasks_container_dark
            } `}
          >
            {currentTasksData.map((task: DataType) => (
              <Task
                key={task._id}
                id={task._id}
                task={task.task}
                userID={userID!}
                handleUpdateTasks={handleUpdateTasks}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
