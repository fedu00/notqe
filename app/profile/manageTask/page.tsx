"use client";
import Select from "@/components/Select/Select";
import "./manageTask.css";
import { useEffect, useState } from "react";
import { CATEGORY_DATA } from "@/constans/constans";
import { TaskType } from "@/types/types";
import { getdataFromSessionStorage } from "@/helpers/getDataFromSessionStorage";
import axios from "axios";
import Task from "@/components/Task/Task";
import ClipLoader from "react-spinners/ClipLoader";

interface DataType {
  createdAt: string;
  task: TaskType;
  updatedAt: string;
  userEmail: string;
  _id: string;
}

export default function ManageTask() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>("");
  const [data, setData] = useState<DataType[] | []>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [currentTasksData, setCurrentTasksData] = useState<DataType[] | []>([]);

  const getTask = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/usersTasks?email=test@test.com"
      );
      const dataTasks: { myTasks: DataType[] | [] } = await response.data;
      setData(dataTasks.myTasks);
      return response;
    } catch (error: any) {
      console.log("you can not get tasks", error);
    }
  };

  useEffect(() => {
    getdataFromSessionStorage("userNotqeId", setIsLoading, setUserId, true);
    if (currentCategory === "all") {
      setCurrentTasksData(data);
    } else {
      const filteredTasks = data.filter(
        (task: DataType) => task.task.category === currentCategory
      );
      setCurrentTasksData(filteredTasks);
    }
  }, [currentCategory, data]);

  useEffect(() => {
    getTask();
  }, []);

  const handleUpdateTasks = (id: string): void => {
    const newTasksData: DataType[] | [] = currentTasksData.filter(
      (task) => task._id !== id
    );
    setCurrentTasksData(newTasksData);
  };

  const emptyTasksData: boolean = currentTasksData.length === 0;

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
    <>
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
        <div className="manage_task_container">
          <div className="title_container">
            <h1>manage your tasks</h1>
            <Select
              data={CATEGORY_DATA}
              onChange={(event) => setCurrentCategory(event.target.value)}
            />
          </div>
          <div className="tasks_container">
            {currentTasksData.map((task: DataType) => (
              <Task
                key={task._id}
                id={task._id}
                task={task.task}
                userId={userId!}
                handleUpdateTasks={handleUpdateTasks}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
