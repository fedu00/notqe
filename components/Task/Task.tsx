"use client";
import "./Task.css";
import { useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { TaskComponentType, DoneTasksType, TaskType } from "@/types/types";
import axios from "axios";

type ImportanceType =
  | "veryImportant"
  | "important"
  | "medium"
  | "lesImportant"
  | "noImportant"
  | "";

export default function Task({
  task,
  id,
  userId,
  handleUpdateTasks,
}: TaskComponentType) {
  const jsonDonteTasksData = sessionStorage.getItem("userNotqeDoneTasks");
  const doneTasksData: DoneTasksType = JSON.parse(jsonDonteTasksData!);

  const { title, description, category, importance } = task;
  const [testTasks, setTestTasks] = useState<DoneTasksType>(doneTasksData);
  const [currentTask, setCurrentTask] = useState<TaskType>({
    title,
    description,
    category,
    importance,
  });
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [textareaHeaight, setTextareaHeaight] = useState<number>(32);

  const textareaRef = useRef(null);

  const handleTextareaHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.scrollHeight > textareaHeaight) {
      setTextareaHeaight(event.target.scrollHeight);
    }
  };

  const selectHowImportantIsTask = (importance: string): ImportanceType => {
    switch (importance) {
      case "5":
        return "veryImportant";
      case "4":
        return "important";
      case "3":
        return "medium";
      case "2":
        return "lesImportant";
      case "1":
        return "noImportant";
      default:
        return "";
    }
  };

  const handleFinishTask = async () => {
    const selectedImportance: ImportanceType =
      selectHowImportantIsTask(importance);
    const updateDoneTasks: DoneTasksType = { ...testTasks };

    const increaseCategoryValue: number = updateDoneTasks[category] + 1;
    const increaseImportanceValue: number =
      updateDoneTasks[selectedImportance] + 1;

    updateDoneTasks[category] = increaseCategoryValue;
    updateDoneTasks[selectedImportance] = increaseImportanceValue;
    setTestTasks(updateDoneTasks);

    sessionStorage.setItem(
      "userNotqeDoneTasks",
      JSON.stringify(updateDoneTasks)
    );
    try {
      const response = await axios.put("/api/users/login", {
        userId,
        doneTasks: updateDoneTasks,
      });

      const responseDeleteTask = await axios.delete(
        `http://localhost:3000/api/usersTasks?id=${id}`
      );
      handleUpdateTasks(id);
    } catch (error: any) {
      console.log("login failed", error.message);
    }
  };

  const handleDeleteTask = async () => {
    const response = await axios.delete(
      `http://localhost:3000/api/usersTasks?id=${id}`
    );
    handleUpdateTasks(id);
  };

  const handleEditTask = async () => {
    if (edit) {
      setEdit(false);
      setShowDescription(false);
      try {
        const response = await axios.put(
          `http://localhost:3000/api/usersTasks?id=${id}`,
          {
            userEmail: "test@test.com",
            task: currentTask,
          }
        );
        if (!response.statusText) {
          throw new Error("Failed to update topic");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setEdit(true);
      setShowDescription(true);
    }
  };

  return (
    <div className={`task ${category} ${edit ? "edit_mode" : ""}`}>
      <input
        ref={textareaRef}
        value={currentTask.title}
        disabled={!edit}
        maxLength={25}
        onChange={(event) => {
          setCurrentTask({ ...currentTask, title: event.target.value });
        }}
      />
      <textarea
        value={currentTask.description}
        style={{ height: showDescription ? textareaHeaight + "px" : "0px" }}
        disabled={!edit}
        onChange={(event) => {
          handleTextareaHeight(event);
          setCurrentTask({ ...currentTask, description: event.target.value });
        }}
      />

      <div className="task_icons_container">
        <AiFillCaretDown
          title={showDescription ? "hide description" : "show description"}
          onClick={() => {
            setShowDescription(!showDescription);
          }}
          size={"30px"}
          className={showDescription ? "show_description" : ""}
        />
        <AiFillCheckCircle
          size={"30px"}
          onClick={handleFinishTask}
          title="finish task"
        />
        <MdEdit
          size={"30px"}
          title="edit task"
          className={edit ? "edit" : ""}
          onClick={handleEditTask}
        />
        <MdDelete
          title="delete task"
          size={"30px"}
          onClick={handleDeleteTask}
        />
      </div>
      <div className="task_importance">{importance}</div>
    </div>
  );
}
