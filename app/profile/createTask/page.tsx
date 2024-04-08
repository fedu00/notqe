"use client";
import "./createTask.css";
import { useState } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import DateInput from "@/components/DateInput/DateInput";
import Textarea from "@/components/TextArea/Textarea";
import Select from "@/components/Select/Select";
import { useUserContext } from "@/context/userContext";

const CATEGORY_DATA = ["healt", "work", "study", "other"];
const IMPORTANCE_DATA = ["1", "2", "3", "4", "5"];

export default function CreateTask({ params }: any) {
  const { email } = useUserContext();

  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    importance: "",
    deadline: "",
  });

  console.log("deadline", task.deadline, typeof task.deadline);

  const handleAddNote = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usersTasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userEmail: email, task: task }),
      });
      setTask({
        title: "",
        description: "",
        category: "",
        importance: "",
        deadline: "",
      });
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="title_container">
        <h1>Create a new task</h1>
        <Button onClick={handleAddNote} text="create task" />
      </div>
      <div className="create_task_container">
        <Input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="enter title"
        />
        <Textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="description..."
        />
        <Select
          data={CATEGORY_DATA}
          onChange={(e) => {
            setTask({ ...task, category: e.target.value });
          }}
        />
        <Select
          data={IMPORTANCE_DATA}
          onChange={(e) => {
            setTask({ ...task, importance: e.target.value });
          }}
        />
        <DateInput
          onChange={(e) => {
            setTask({ ...task, deadline: e.target.value });
          }}
        />
      </div>
    </div>
  );
}