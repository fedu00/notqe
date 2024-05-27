"use client";
import UserExperience from "@/components/UserExperience/UserExperience";
import "./experience.css";
import TaskScore from "@/components/TaskScore/TaskScore";
import { DoneTasksType } from "@/types/types";

export default function Experience() {
  const jsonDonteTasksData: string | null =
    sessionStorage.getItem("userNotqeDoneTasks");
  const doneTasksData: DoneTasksType = JSON.parse(jsonDonteTasksData!);

  const {
    health,
    other,
    study,
    work,
    noImportant,
    lesImportant,
    medium,
    important,
    veryImportant,
  } = doneTasksData;

  return (
    <div className="experience_container">
      <div className="tasks-experience_container">
        <div className="category_tasks">
          <TaskScore score={health} title={"health"} selectClass={"health"} />
          <TaskScore score={work} title={"work"} selectClass={"work"} />
          <TaskScore score={study} title={"study"} selectClass={"study"} />
          <TaskScore score={other} title={"other"} selectClass={"other"} />
        </div>
        <div className="importance_tasks">
          <TaskScore score={noImportant} title={"no important"} />
          <TaskScore score={lesImportant} title={"less important"} />
          <TaskScore score={medium} title={"medium"} />
          <TaskScore score={important} title={"important"} />
          <TaskScore score={veryImportant} title={"very important"} />
        </div>
      </div>
      <UserExperience doneTasksData={doneTasksData} />
    </div>
  );
}
