"use client";
import "./createTask.css";
import { useState, useEffect } from "react";
import {
  CREATE_TASK_CATEGORY_DATA,
  IMPORTANCE_DATA,
} from "@/constans/constans";
import { TaskType } from "@/types/types";
import { getdataFromSessionStorage } from "@/helpers/getDataFromSessionStorage";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
// import DateInput from "@/components/DateInput/DateInput"; //save for next app version
import Textarea from "@/components/TextArea/Textarea";
import Select from "@/components/Select/Select";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

type TaskErrorType = {
  title: boolean;
  description: boolean;
};

export default function CreateTask() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [task, setTask] = useState<TaskType>({
    title: "",
    description: "",
    category: "health",
    importance: "1",
    // deadline: "",
  });

  const [showError, setShowError] = useState<TaskErrorType>({
    title: false,
    description: false,
  });

  useEffect(() => {
    getdataFromSessionStorage("userNotqeEmail", setIsLoading, setEmail, true);
  }, []);

  const handleOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, title: event.target.value });
    setShowError({ ...showError, title: false });
  };
  const handleOnChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTask({ ...task, description: event.target.value });
    setShowError({ ...showError, description: false });
  };

  const handleAddNote = async () => {
    const titleIsnotEmpty: boolean = task.title.length > 0;
    const descriptionIsnotEmptyy: boolean = task.description.length > 0;
    if (titleIsnotEmpty && descriptionIsnotEmptyy) {
      try {
        const response = await axios.post(
          `http://${process.env.domain}/api/usersTasks`,
          // "http://localhost:3000/api/usersTasks",
          { userEmail: email, task: task }
        );
        setTask({
          title: "",
          description: "",
          category: "health",
          importance: "1",
          // deadline: "",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowError({
        title: !titleIsnotEmpty,
        description: !descriptionIsnotEmptyy,
      });
    }
  };
  return (
    <div className="create_task_page_container">
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
          <div className="title_container">
            <h1>Create a new task</h1>
            <Button onClick={handleAddNote} text="create task" />
          </div>
          <div className="create_task_form_container">
            <Input
              type="text"
              value={task.title}
              showError={showError.title}
              errorMessage="this field cannot be empty"
              onChange={(event) => handleOnChangeTitle(event)}
              placeholder="enter title"
            />
            <Textarea
              value={task.description}
              showError={showError.description}
              errorMessage="this field cannot be empty"
              onChange={(event) => handleOnChangeDescription(event)}
              placeholder="description..."
            />
            <Select
              data={CREATE_TASK_CATEGORY_DATA}
              value={task.category}
              onChange={(event) => {
                setTask({ ...task, category: event.target.value });
              }}
            />
            <Select
              data={IMPORTANCE_DATA}
              value={task.importance}
              onChange={(event) => {
                setTask({ ...task, importance: event.target.value });
              }}
            />
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
