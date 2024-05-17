"use client";
import Select from "@/components/Select/Select";
import "./manageTask.css";
import { useEffect, useState } from "react";
import Task from "@/components/Task/Task";
import { CATEGORY_DATA } from "@/constans/constans";
import axios from "axios";

export default function ManageTask() {
  const [data, setData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [currentTasksData, setCurrentTasksData] = useState([]);

  const userId = sessionStorage.getItem("userNotqeId");

  const getTask = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/usersTasks?email=test@test.com"
      );
      const dataTasks = await response.data;
      setData(dataTasks.myTasks);
      return response;
    } catch (error: any) {
      console.log("you can not get tasks", error);
    }
  };

  useEffect(() => {
    if (currentCategory === "all") {
      setCurrentTasksData(data);
    } else {
      const filteredTasks = data.filter(
        (task: any) => task.task.category === currentCategory
      );
      setCurrentTasksData(filteredTasks);
    }
  }, [currentCategory, data]);

  useEffect(() => {
    getTask();
  }, []);

  //zmien nazwe
  const handleUpdateTasks = (id: string) => {
    const newTasksData = currentTasksData.filter((task) => task._id !== id);
    setCurrentTasksData(newTasksData);
  };

  const emptyTasksData = currentTasksData.length === 0;

  if (emptyTasksData) {
    return (
      <div className="manage_task_container">
        <div className="title_container">
          <h1>You don't have any tasks yet :(</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="manage_task_container">
      <div className="title_container">
        <h1>manage your tasks</h1>
        <Select
          data={CATEGORY_DATA}
          onChange={(event) => setCurrentCategory(event.target.value)}
        />
      </div>
      <div className="tasks_container">
        {/* CHANGE TYPE */}
        {currentTasksData.map((task: any) => (
          <Task
            key={task._id}
            id={task._id}
            task={task.task}
            userId={userId}
            handleUpdateTasks={handleUpdateTasks}
          />
        ))}
      </div>
    </div>
  );
}
