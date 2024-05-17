"use client";
import "./createTask.css";
import { useState } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
// import DateInput from "@/components/DateInput/DateInput"; //save for next app version
import Textarea from "@/components/TextArea/Textarea";
import Select from "@/components/Select/Select";
import axios from "axios";

const CATEGORY_DATA = ["health", "work", "study", "other"];
const IMPORTANCE_DATA = ["1", "2", "3", "4", "5"];

export default function CreateTask({ params }: any) {
  let email = sessionStorage.getItem("userNotqeEmail");

  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "health",
    importance: "1",
    // deadline: "",
  });

  const [showError, setShowError] = useState({
    title: false,
    description: false,
  });

  const handleOnChangeTitle = (event) => {
    setTask({ ...task, title: event.target.value });
    setShowError({ ...showError, title: false });
  };
  const handleOnChangeDescription = (event) => {
    setTask({ ...task, description: event.target.value });
    setShowError({ ...showError, description: false });
  };

  const handleAddNote = async () => {
    const titleIsnotEmpty = task.title.length > 0;
    const descriptionIsnotEmptyy = task.description.length > 0;
    if (titleIsnotEmpty && descriptionIsnotEmptyy) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/usersTasks",
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
          data={CATEGORY_DATA}
          onChange={(event) => {
            setTask({ ...task, category: event.target.value });
          }}
        />
        <Select
          data={IMPORTANCE_DATA}
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
    </div>
  );
}
