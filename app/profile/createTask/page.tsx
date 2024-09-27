"use client";
import "./createTask.scss";
import { useState, useEffect } from "react";
import {
  TASK_CATEGORY_LIST,
  TASK_LVL_IMPORTANCE_LIST,
} from "@/constans/constans";
import { TaskType } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Textarea from "@/components/TextArea/Textarea";
import Select from "@/components/Select/Select";
import axios from "axios";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Form from "@/components/Form/Form";

export default function CreateTask() {
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState<TaskType>({
    title: "",
    description: "",
    category: "default",
    importanceLevel: "default",
  });
  const [showError, setShowError] = useState(false);
  const { userData } = useSelector((state: RootState) => state);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleOnChange =
    (field: keyof TaskType) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setTask((prev) => ({ ...task, [field]: event.target.value }));
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
    <div className="create-task">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="create-task__title-container">
            <h2 className="create-task__title">Create a new task</h2>
            <Button onClick={handleAddTask} text="create task" />
          </div>
          <Form>
            <Input
              type="text"
              value={task.title}
              onChange={handleOnChange("title")}
              placeholder="enter title"
            />
            <Textarea
              value={task.description}
              onChange={handleOnChange("description")}
              placeholder="description..."
            />
            <Select
              data={TASK_CATEGORY_LIST}
              value={task.category}
              placeholder="select category"
              onChange={handleOnChange("category")}
            />
            <Select
              data={TASK_LVL_IMPORTANCE_LIST}
              value={task.importanceLevel}
              placeholder="select importance level"
              onChange={handleOnChange("importanceLevel")}
            />
            {showError ? (
              <ErrorMessage errorMessage="You must complete all fields!" />
            ) : (
              <span>
                <br></br>
              </span>
            )}
          </Form>
        </>
      )}
    </div>
  );
}
