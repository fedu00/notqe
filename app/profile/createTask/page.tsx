"use client";
import "./createTask.css";
import { useState, useEffect } from "react";
import {
  CREATE_TASK_CATEGORY_DATA,
  TASKS_IMPORTANCE_DATA,
} from "@/constans/constans";
import { TaskType } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Textarea from "@/components/TextArea/Textarea";
import Select from "@/components/Select/Select";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function CreateTask() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [task, setTask] = useState<TaskType>({
    title: "",
    description: "",
    category: "default",
    importanceLevel: "default",
  });
  const [showError, setShowError] = useState<boolean>(false);

  const { ui, userData } = useSelector((state: RootState) => state);
  const { darkModeTheme } = ui;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, title: event.target.value });
    setShowError(false);
  };
  const handleOnChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTask({ ...task, description: event.target.value });
    setShowError(false);
  };

  const handleAddTask = async () => {
    const titleIsnotEmpty: boolean = task.title.length > 0;
    const descriptionIsnotEmptyy: boolean = task.description.length > 0;
    const categoryIsSelected: boolean = task.category != "default";
    const importanceIsSelected: boolean = task.importanceLevel != "default";

    if (
      titleIsnotEmpty &&
      descriptionIsnotEmptyy &&
      categoryIsSelected &&
      importanceIsSelected
    ) {
      try {
        const response = await axios.post(
          // `https://notqe.vercel.app/api/usersTasks`,
          "http://localhost:3000/api/usersTasks",
          { userID: userData.userId, task: task }
        );
        setTask({
          title: "",
          description: "",
          category: "default",
          importanceLevel: "default",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowError(true);
    }
  };

  return (
    <div className={"create_task_page_container"}>
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
        <>
          <div
            className={`title_container ${
              darkModeTheme && "title_container_dark"
            } `}
          >
            <h1>Create a new task</h1>
            <Button onClick={handleAddTask} text="create task" />
          </div>
          <div className={"create_task_form_container"}>
            <Input
              type="text"
              value={task.title}
              errorMessage="this field cannot be empty"
              onChange={(event) => handleOnChangeTitle(event)}
              placeholder="enter title"
            />
            <Textarea
              value={task.description}
              errorMessage="this field cannot be empty"
              onChange={(event) => handleOnChangeDescription(event)}
              placeholder="description..."
            />
            <Select
              data={CREATE_TASK_CATEGORY_DATA}
              value={task.category}
              placeholder="select category"
              onChange={(event) => {
                setShowError(false);
                setTask({ ...task, category: event.target.value });
              }}
            />
            <Select
              data={TASKS_IMPORTANCE_DATA}
              value={task.importanceLevel}
              placeholder="select importance level"
              onChange={(event) => {
                setShowError(false);
                setTask({ ...task, importanceLevel: event.target.value });
              }}
            />
            {showError && (
              <p className={"error_message"}>You must complete all fields!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
