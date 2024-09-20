"use client";
import "./manageTask.scss";
import { useEffect, useState } from "react";
import {
  FULL_TASK_CATEGORY_LIST,
  FULL_TASK_LVL_IMPORTANCE_LIST,
} from "@/constans/constans";
import { DataType } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import Select from "@/components/Select/Select";
import axios from "axios";
import Task from "@/components/Task/Task";
import ClipLoader from "react-spinners/ClipLoader";

export default function ManageTask() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tasksData, setTasksData] = useState<DataType[] | []>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [currentImportance, setCurrentImportance] = useState<string>("all");
  const [currentTasksData, setCurrentTasksData] = useState<DataType[] | []>([]);
  const { userData } = useSelector((state: RootState) => state);
  const { userId } = userData;

  const getFilteredTasks = () => {
    if (currentCategory === "all" && currentImportance === "all") {
      setCurrentTasksData(tasksData);
    } else {
      const categoryFilteredTasks = tasksData.filter(
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
  }, []);

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

  const emptyTasksData: boolean = tasksData.length === 0;
  if (emptyTasksData) {
    return (
      <div className="manage_task_container">
        <div>
          <h1>You don't have any tasks yet</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="manage_tasks_page_container">
      {isLoading ? (
        <ClipLoader
          color="#ffa868"
          loading={true}
          size={60}
          speedMultiplier={0.4}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="manage_task_container ">
          <div>
            <h2 className="manage_tasks_title">manage your tasks</h2>
            <Select
              data={FULL_TASK_CATEGORY_LIST}
              value={currentCategory === "all" ? "default" : currentCategory}
              onChange={(event) => setCurrentCategory(event.target.value)}
              placeholder="select category"
            />
            <Select
              data={FULL_TASK_LVL_IMPORTANCE_LIST}
              value={
                currentImportance === "all" ? "default" : currentImportance
              }
              onChange={(event) => setCurrentImportance(event.target.value)}
              placeholder="select task importance"
            />
          </div>
          <div className="tasks_container theme-background">
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
