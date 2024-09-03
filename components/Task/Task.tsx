"use client";
import "./Task.css";
import { useState, useRef, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { TaskComponentType, DoneTasksType, TaskType } from "@/types/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { updateUserTaskValue } from "@/redux/store/userSlice";
import axios from "axios";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const getImportanceTaskNumber = (importance: string): string => {
  switch (importance) {
    case "all":
      return "all";
    case "very important":
      return "5";
    case "important":
      return "4";
    case "medium":
      return "3";
    case "less important":
      return "2";
    case "no important":
      return "1";
    default:
      return "";
  }
};
const getTaskImportance = (importance: string): string => {
  switch (importance) {
    case "very important":
      return "veryImportant";
    case "important":
      return "important";
    case "medium":
      return "mediumImportant";
    case "less important":
      return "lessImportant";
    case "no important":
      return "noImportant";
    default:
      return "noImportant";
  }
};

export default function Task({
  task,
  id,
  userID,
  handleUpdateTasks,
  setTasksData,
}: TaskComponentType) {
  const { title, description, category, importanceLevel } = task;
  const [isUserTasksDataStale, setIsUserTasksDataStale] =
    useState<boolean>(false);

  const [currentTask, setCurrentTask] = useState<TaskType>({
    title,
    description,
    category,
    importanceLevel,
  });
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [textareaHeaight, setTextareaHeaight] = useState<number>(32);

  const dispatch = useDispatch();
  const { ui, userData } = useSelector((state: RootState) => state);
  const { darkModeTheme } = ui;
  const textareaRef = useRef(null);

  const handleTextareaHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.scrollHeight > textareaHeaight) {
      setTextareaHeaight(event.target.scrollHeight);
    }
  };

  const importanceNumber = getImportanceTaskNumber(importanceLevel);

  const updateUserTasksData = async (updateDoneTasks) => {
    setIsUserTasksDataStale(false);
    try {
      const response = await axios.put("/api/users/login", {
        userId: userID,
        doneTasks: updateDoneTasks,
      });
      const responseDeleteTask = await axios.delete(
        // `https://notqe.vercel.app/api/usersTasks?id=${id}`
        `http://localhost:3000/api/usersTasks?id=${id}`
      );
      handleUpdateTasks(id);
    } catch (error: any) {
      console.log("login failed", error.message);
    }
  };

  const handleFinishTask = async () => {
    const taskImportance = getTaskImportance(importanceLevel);
    dispatch(updateUserTaskValue({ category, taskImportance }));
    setIsUserTasksDataStale(true);
    setTasksData((prevValue) => {
      return prevValue.filter((task) => task._id !== id);
    });
    const response = await axios.delete(
      // `https://notqe.vercel.app/api/usersTasks?id=${id}`
      `http://localhost:3000/api/usersTasks?id=${id}`
    );
  };

  useEffect(() => {
    if (isUserTasksDataStale) {
      updateUserTasksData(userData.doneTasks);
    }
  }, [userData.doneTasks]);

  const handleDeleteTask = async () => {
    const response = await axios.delete(
      // `https://notqe.vercel.app/api/usersTasks?id=${id}`
      `http://localhost:3000/api/usersTasks?id=${id}`
    );

    setTasksData((prevValue) => {
      return prevValue.filter((task) => task._id !== id);
    });

    handleUpdateTasks(id);
  };

  const handleEditTask = async () => {
    if (edit) {
      setEdit(false);
      setShowDescription(false);
      try {
        const response = await axios.put(
          // `https://notqe.vercel.app/api/usersTasks?id=${id}`,
          `http://localhost:3000/api/usersTasks?id=${id}`,
          {
            userID: userID,
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
    <div
      className={`task ${category + "_bgc"} ${
        edit && (darkModeTheme ? "edit_mode_dark" : "edit_mode")
      }`}
    >
      <input
        ref={textareaRef}
        value={currentTask.title}
        className={"remove_background"}
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
        className={`remove_background ${inter.className} `}
        onChange={(event) => {
          handleTextareaHeight(event);
          setCurrentTask({ ...currentTask, description: event.target.value });
        }}
      />

      <div
        className={`task_icons_container ${
          darkModeTheme && "task_icons_container_dark"
        } `}
      >
        <AiFillCaretDown
          title={showDescription ? "hide description" : "show description"}
          onClick={() => {
            setShowDescription(!showDescription);
          }}
          size={"30px"}
          color={darkModeTheme ? "#eeeee1" : "#22252a"}
          className={`${showDescription && "show_description"}`}
        />
        <AiFillCheckCircle
          size={"30px"}
          color={darkModeTheme ? "#eeeee1" : "#22252a"}
          onClick={handleFinishTask}
          title="finish task"
        />
        <MdEdit
          size={"30px"}
          color={darkModeTheme ? "#eeeee1" : "#22252a"}
          title="edit task"
          className={`${edit && "edit"}`}
          onClick={handleEditTask}
        />
        <MdDelete
          title="delete task"
          size={"30px"}
          color={darkModeTheme ? "#eeeee1" : "#22252a"}
          onClick={handleDeleteTask}
        />
      </div>
      <div
        className={`${"task_importance"} ${
          darkModeTheme && "task_importance_dark"
        } `}
      >
        {importanceNumber}
      </div>
    </div>
  );
}
