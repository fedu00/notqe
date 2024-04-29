"use client";
import Select from "@/components/Select/Select";
import "./manageTask.css";
import { useEffect, useState } from "react";
import Task from "@/components/Task/Task";
import { useUserContext } from "@/context/userContext";
import { CATEGORY_DATA } from "@/constans/constans";

export default function ManageTask() {
  const { userId } = useUserContext();
  const [data, setDaya] = useState([]);
  const [currentCategory, setCurrentCategory] = useState<string>("all");

  const getTask = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/usersTasks?email=test@test.com",
        { cache: "no-store" }
      );
      const dataTasks = await response.json();
      setDaya(dataTasks.myTasks);
      return response;
    } catch (error: any) {
      console.log("you can not get tasks", error);
    }
  };

  //nazwa mi nie pasuje, nie mówi co ze ta f zwraca
  const returnTasks = (task: any) => {
    if (currentCategory === "all") {
      return (
        <Task key={task._id} id={task._id} task={task.task} userId={userId} />
      );
    } else if (task.task.category === currentCategory) {
      return (
        <Task key={task._id} id={task._id} task={task.task} userId={userId} />
      );
    }
  };

  useEffect(() => {
    getTask();
  }, []);

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
        {data.map((task: any) => returnTasks(task))}
      </div>
    </div>
  );
}
