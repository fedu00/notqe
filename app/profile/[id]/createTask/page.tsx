"use client";
import "./createTask.scss";
import { useState } from "react";
import { TASK_LVL_IMPORTANCE_LIST } from "@/constants/taskLvlImportanceList";
import { TASK_CATEGORY_LIST } from "@/constants/taskCategoryList";
import { TaskType } from "@/types/TaskType";
import { SelectCategoryTaskType } from "@/types/SelectCategoryTaskType";
import { SelectImportanceLevelTasksType } from "@/types/SelectImportanceLevelTasksType";
import { useParams } from "next/navigation";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Textarea from "@/components/TextArea/Textarea";
import Select from "@/components/Select/Select";
import clientApi from "@/apiClients/clientApi";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Form from "@/components/Form/Form";

const defaultCategory = SelectCategoryTaskType.DEFAULT;
const defaultImportanceLevel = SelectImportanceLevelTasksType.DEFAULT;

export default function CreateTask() {
  const params = useParams();
  const userID = params?.id;

  const [task, setTask] = useState<TaskType>({
    title: "",
    description: "",
    category: defaultCategory,
    importanceLevel: defaultImportanceLevel,
  });
  const [categoryIsSelected, setCategoryIsSelected] = useState(false);
  const [importanceIsSelected, setImportanceIsSelected] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleOnChange =
    (field: keyof TaskType) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setTask((prev) => ({ ...task, [field]: event.target.value }));
      setShowError(false);
      if (field === "category") {
        setCategoryIsSelected(true);
      }
      if (field === "importanceLevel") {
        setImportanceIsSelected(true);
      }
    };

  const handleAddTask = async () => {
    const titleIsnotEmpty: boolean = task.title.length > 0;
    const descriptionIsnotEmptyy: boolean = task.description.length > 0;

    if (
      titleIsnotEmpty &&
      descriptionIsnotEmptyy &&
      categoryIsSelected &&
      importanceIsSelected
    ) {
      try {
        await clientApi.post("/usersTasks", {
          userID,
          task,
        });
        setTask({
          title: "",
          description: "",
          category: defaultCategory,
          importanceLevel: defaultImportanceLevel,
        });
        setCategoryIsSelected(false);
        setImportanceIsSelected(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="create-task">
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
        <ErrorMessage
          showError={showError}
          errorMessage="You must complete all fields!"
        />
      </Form>
    </div>
  );
}
