"use client";
import Select from "@/components/Select/Select";
import "./manageTask.css";
import { useEffect, useState } from "react";
import Task from "@/components/Task/Task";

const CATEGORY_DATA = ["all", "healt", "work", "study", "other"];

export default function ManageTask() {
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

  const selectedTasks = (task: any) => {
    if (currentCategory === "all") {
      // console.log("taaaaaaask", task);
      // console.log("taskIDDDDDDDDDDDDDDD", task._id);

      return <Task key={task._id} id={task._id} task={task.task} />;
    } else if (task.task.category === currentCategory) {
      return <Task key={task._id} id={task._id} task={task.task} />;
    }
  };

  // console.log("dayadayadaya", data);
  // console.log("currentCategory", currentCategory);

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
        {/* tutaj zmien typowanie */}
        {data.map((task: any) => selectedTasks(task))}
      </div>
    </div>
  );
}
