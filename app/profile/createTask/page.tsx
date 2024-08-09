"use client";
import styles from "./createTask.module.css";
import { useState, useEffect } from "react";
import {
  CREATE_TASK_CATEGORY_DATA,
  TASKS_IMPORTANCE_DATA,
} from "@/constans/constans";
import { TaskType } from "@/types/types";
import { getdataFromSessionStorage } from "@/helpers/getDataFromSessionStorage";
import { useDarkModeContext } from "@/context/userContext";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
// import DateInput from "@/components/DateInput/DateInput"; //save for next app version
import Textarea from "@/components/TextArea/Textarea";
import Select from "@/components/Select/Select";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function CreateTask() {
  const [userID, setUserID] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [task, setTask] = useState<TaskType>({
    title: "",
    description: "",
    category: "default",
    importance: "default",
    // deadline: "",
  });

  const [showError, setShowError] = useState<boolean>(false);

  const { darkMode } = useDarkModeContext();

  useEffect(() => {
    getdataFromSessionStorage("userID", setIsLoading, setUserID, true);
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
    const importanceIsSelected: boolean = task.importance != "default";

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
          { userID: userID, task: task }
        );
        setTask({
          title: "",
          description: "",
          category: "health",
          importance: "default",
          // deadline: "",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowError(true);
    }
  };

  return (
    <div
      className={`${styles.create_task_page_container} ${
        darkMode && styles.create_task_page_container_dark
      } `}
    >
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
            className={`${styles.title_container} ${
              darkMode && styles.title_container_dark
            } `}
          >
            <h1>Create a new task</h1>
            <Button onClick={handleAddTask} text="create task" />
          </div>
          <div className={styles.create_task_form_container}>
            <Input
              type="text"
              value={task.title}
              errorMessage="this field cannot be empty"
              onChange={(event) => handleOnChangeTitle(event)}
              placeholder="enter title"
              darkMode={darkMode}
            />
            <Textarea
              value={task.description}
              errorMessage="this field cannot be empty"
              onChange={(event) => handleOnChangeDescription(event)}
              placeholder="description..."
              darkMode={darkMode}
            />
            <Select
              data={CREATE_TASK_CATEGORY_DATA}
              value={task.category}
              placeholder="select category"
              onChange={(event) => {
                setShowError(false);
                setTask({ ...task, category: event.target.value });
              }}
              darkMode={darkMode}
            />
            <Select
              data={TASKS_IMPORTANCE_DATA}
              value={task.importance}
              placeholder="select importance level"
              onChange={(event) => {
                setShowError(false);
                setTask({ ...task, importance: event.target.value });
              }}
              darkMode={darkMode}
            />
            {showError && (
              <p className={styles.error_message}>
                You must complete all fields!
              </p>
            )}
            {/* save this for future version app */}
            {/* <DateInput
          onChange={(event) => {
            setTask({ ...task, deadline: event.target.value });
          }}
        /> */}
          </div>
        </>
      )}
    </div>
  );
}
