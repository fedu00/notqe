"use client";
import { useEffect, useState } from "react";
import { CATEGORY_DATA, ALL_TASKS_IMPORTANCE_DATA } from "@/constans/constans";
import { TaskType } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/Select/Select";
import "./manageTask.css";
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
  const [data, setData] = useState<DataType[] | []>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [currentImportance, setCurrentImportance] = useState<string>("all");
  const [currentTasksData, setCurrentTasksData] = useState<DataType[] | []>([]);
  const { ui, userData } = useSelector((state: RootState) => state);
  const { darkModeTheme } = ui;
  const { userId } = userData;

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
          task.task.importanceLevel === currentImportance ||
          currentImportance === "all"
      );
      setCurrentTasksData(filteredTasks);
    }
  }, [currentCategory, data, currentImportance]);

  useEffect(() => {
    if (userId != null && userId != "") {
      setIsLoading(false);
      getTask(userId);
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

  //on database is something wrong, ther is one old task
  const emptyTasksData: boolean = data.length === 0;
  if (emptyTasksData) {
    return (
      <div className="manage_task_container">
        <div>
          <h1 className={`${darkModeTheme && "manage_tasks_title_dark"}`}>
            You don't have any tasks yet
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className={"manage_tasks_page_container"}>
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
        <div className={"manage_task_container"}>
          <div>
            <h1
              className={`${"manage_tasks_title"} ${
                darkModeTheme && "manage_tasks_title_dark"
              } `}
            >
              manage your tasks
            </h1>
            <Select
              data={CATEGORY_DATA}
              value={currentCategory === "all" ? "default" : currentCategory}
              onChange={(event) => setCurrentCategory(event.target.value)}
              placeholder="select category"
            />
            <Select
              data={ALL_TASKS_IMPORTANCE_DATA}
              value={
                currentImportance === "all" ? "default" : currentImportance
              }
              onChange={(event) => setCurrentImportance(event.target.value)}
              placeholder="select task importance"
            />
          </div>
          <div
            className={`${"tasks_container"} ${
              darkModeTheme && "tasks_container_dark"
            } `}
          >
            {currentTasksData.map((task: DataType) => (
              <Task
                key={task._id}
                id={task._id}
                task={task.task}
                userID={userId!}
                handleUpdateTasks={handleUpdateTasks}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
