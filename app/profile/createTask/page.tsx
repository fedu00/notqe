"use client";
import { useState } from "react";

export default function CreateTask({ params }: any) {
  console.log("params", params);

  // const [task, setTask] = useState({
  //   title: "",
  //   description: "",
  // });
  // const [userEmail, setUserEmail] = useState("");

  // const handleAddNote = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/usersTasks", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({ userEmail: userEmail, task: task }),
  //     });

  //     console.log("response", response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      <h1>no zrob cos!!</h1>
      <p>łortiortior</p>
      {/* <button onClick={handleLogout}>logout</button> */}
      {/* <div>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="enter title"
        />
        <input
          type="text"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="enter description"
        />
        <button onClick={handleAddNote}>dodaj notatke</button>
      </div> */}
    </div>
  );
}
