"use client";
import "./Task.css";
import { useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";

// bedzie to samo interface/type co dane pobierane w managetasks
export default function Task({ task, id }: any) {
  const { title, description, category, importance, deadline } = task;

  const [currentTask, setCurrentTask] = useState({
    title,
    description,
    category,
    importance,
    deadline,
  });
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  //to po nizej nie zadziała jak stworzysz duzy opis (na poczatku)
  const [textareaHeaight, setTextareaHeaight] = useState<number>(32);

  const textareaRef = useRef(null);

  const handleTextareaHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.scrollHeight > textareaHeaight) {
      setTextareaHeaight(event.target.scrollHeight);
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
