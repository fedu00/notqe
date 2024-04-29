"use client";
import "./Task.css";
import { useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { useUserContext } from "@/context/userContext";
import axios from "axios";

// same interface/type what you can find in manageTasks
export default function Task({ task, id, userId }: any) {
  const { title, description, category, importance, deadline } = task;
  const { doneTasks, setDoneTasks } = useUserContext();
  const [currentTask, setCurrentTask] = useState({
    title,
    description,
    category,
    importance,
    deadline,
  });
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  const [textareaHeaight, setTextareaHeaight] = useState<number>(32);

  const textareaRef = useRef(null);

  const handleTextareaHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.scrollHeight > textareaHeaight) {
      setTextareaHeaight(event.target.scrollHeight);
    }
  };

  const selectHowImportantIsTask = (importance) => {
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
    }
  };

  const handleFinishTask = async () => {
    const selectedImportance = selectHowImportantIsTask(importance);
    setDoneTasks((prevValue) => ({
      ...prevValue,
      [selectedImportance]: prevValue[selectedImportance] + 1,
      [category]: prevValue[category] + 1,
    }));
    try {
      const response = await axios.put("/api/users/login", {
        userId,
        doneTasks,
      });

      const responseDeleteTask = await fetch(
        `http://localhost:3000/api/usersTasks?id=${id}`,
        {
          method: "DELETE",
        }
      );
      location.reload();
    } catch (error: any) {
      console.log("login failed", error.message);
    }
  };

  const handleDeleteTask = async () => {
    const response = await fetch(
      `http://localhost:3000/api/usersTasks?id=${id}`,
      {
        method: "DELETE",
      }
    );
    console.log("delete response", response.ok);
    location.reload();
  };

  const handleEditTask = async () => {
    if (edit) {
      setEdit(false);
      setShowDescription(false);
      try {
        const response = await fetch(
          `http://localhost:3000/api/usersTasks?id=${id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              userEmail: "test@test.com",
              task: currentTask,
            }),
          }
        );
        if (!response.ok) {
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
        onChange={(e) => {
          setCurrentTask({ ...currentTask, title: e.target.value });
        }}
      />
      <textarea
        value={currentTask.description}
        style={{ height: showDescription ? textareaHeaight + "px" : "0px" }}
        disabled={!edit}
        onChange={(e) => {
          handleTextareaHeight(e);
          setCurrentTask({ ...currentTask, description: e.target.value });
        }}
      />

      <div className="task_icons_container">
        <AiFillCaretDown
          onClick={() => {
            setShowDescription(!showDescription);
          }}
          size={"30px"}
          className={showDescription ? "show_description" : ""}
        />
        <AiFillCheckCircle size={"30px"} onClick={handleFinishTask} />
        <MdEdit
          size={"30px"}
          className={edit ? "edit" : ""}
          onClick={handleEditTask}
        />
        <MdDelete size={"30px"} onClick={handleDeleteTask} />
      </div>
      <div className="task_importance">{importance}</div>
    </div>
  );
}
