"use client";
import ProgresBar from "@/components/ProgresBar/ProgresBar";
import "./experience.css";
import TaskScore from "@/components/TaskScore/TaskScore";

export default function Experience() {
  const jsonDonteTasksData: string =
    sessionStorage.getItem("userNotqeDoneTasks");
  const doneTasksData = JSON.parse(jsonDonteTasksData);

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
          <TaskScore score={lesImportant} title={"les important"} />
          <TaskScore score={medium} title={"medium"} />
          <TaskScore score={important} title={"important"} />
          <TaskScore score={veryImportant} title={"very important"} />
        </div>
      </div>
      <div className="user_experience_container">
        <p className="lvl">{6} lvl</p>
        <ProgresBar percentage={"30%"} />
        <p className="tasks_on_lvl">tasks done on this lvl: 17/56 </p>
        <p></p>
      </div>
    </div>
  );
}
