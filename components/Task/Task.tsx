"use client";
import "./Task.scss";
import { useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { DataType } from "@/types/DataType";
import { TaskType } from "@/types/TaskType";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, SetStateAction } from "react";
import { ImportanceLevelTasksType } from "@/types/ImportanceLevelTasksType";
import { getUserDoneTasks } from "@/redux/slices/userSlice/userSelectors";
import { finishUserTask } from "@/redux/slices/userSlice/userThunk";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import clsx from "clsx";

interface TaskComponentType {
  task: TaskType;
  id: string;
  userID: string;
  handleUpdateTasks(id: string): void;
  setTasksData: Dispatch<SetStateAction<DataType[] | []>>;
}
const importanceTaskNumber: {
  [key in ImportanceLevelTasksType]: string;
} = {
  [ImportanceLevelTasksType.VERY_IMPORTANT]: "5",
  [ImportanceLevelTasksType.IMPORTANT]: "4",
  [ImportanceLevelTasksType.MEDIUM]: "3",
  [ImportanceLevelTasksType.LESS_IMPORTANT]: "2",
  [ImportanceLevelTasksType.NO_IMPORTANT]: "1",
};

const importanceTaskValue: {
  [key in ImportanceLevelTasksType]: string;
} = {
  [ImportanceLevelTasksType.VERY_IMPORTANT]: "veryImportant",
  [ImportanceLevelTasksType.IMPORTANT]: "important",
  [ImportanceLevelTasksType.MEDIUM]: "mediumImportant",
  [ImportanceLevelTasksType.LESS_IMPORTANT]: "lessImportant",
  [ImportanceLevelTasksType.NO_IMPORTANT]: "noImportant",
};

const getImportanceTaskNumber = (
  importance: ImportanceLevelTasksType
): string => {
  return importanceTaskNumber[importance];
};

const getTaskImportance = (importance: ImportanceLevelTasksType): string => {
  return importanceTaskValue[importance];
};

const MIN_TEXTAREA_HEIGHT: number = 32;

export default function Task({
  task,
  id,
  userID,
  handleUpdateTasks,
  setTasksData,
}: TaskComponentType) {
  const { title, description, category, importanceLevel } = task;
  const [currentTask, setCurrentTask] = useState<TaskType>({
    title,
    description,
    category,
    importanceLevel,
  });
  const [showDescription, setShowDescription] = useState(false);
  const [edit, setEdit] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(MIN_TEXTAREA_HEIGHT);

  const dispatch = useDispatch<AppDispatch>();
  const doneTasks = useSelector(getUserDoneTasks);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleTextareaHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.scrollHeight > textareaHeight) {
      setTextareaHeight(event.target.scrollHeight);
    }
  };

  const importanceNumber = getImportanceTaskNumber(importanceLevel);

  const handleFinishTask = async () => {
    const taskImportance = getTaskImportance(importanceLevel);
    setTasksData((prevValue) => {
      return prevValue.filter((task) => task._id !== id);
    });
    dispatch(
      finishUserTask({ taskId: id, category, taskImportance, doneTasks })
    );
  };

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
      className={clsx(
        "task",
        `task--${category}-bgc`,
        edit && "task--edit-mode"
      )}
    >
      <input
        ref={inputRef}
        value={currentTask.title}
        disabled={!edit}
        maxLength={25}
        className="task__input"
        onChange={(event) => {
          setCurrentTask({ ...currentTask, title: event.target.value });
        }}
      />
      <textarea
        value={currentTask.description}
        style={{ height: showDescription ? textareaHeight + "px" : "0px" }}
        disabled={!edit}
        className="task__textarea"
        onChange={(event) => {
          handleTextareaHeight(event);
          setCurrentTask({ ...currentTask, description: event.target.value });
        }}
      />

      <div className="task__icons-container">
        <AiFillCaretDown
          title={showDescription ? "hide description" : "show description"}
          onClick={() => {
            setShowDescription(!showDescription);
          }}
          size="30px"
          className={clsx(showDescription && "task__icon--show-description")}
        />
        <AiFillCheckCircle
          size="30px"
          onClick={handleFinishTask}
          title="finish task"
        />
        <MdEdit
          size="30px"
          title="edit task"
          className={clsx(edit && "task__icon--edit")}
          onClick={handleEditTask}
        />
        <MdDelete title="delete task" size="30px" onClick={handleDeleteTask} />
      </div>
      <div className="task__importance">{importanceNumber}</div>
    </div>
  );
}
