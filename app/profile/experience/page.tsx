"use client";
import ProgresBar from "@/components/ProgresBar/ProgresBar";
import "./experience.css";
import TaskScore from "@/components/TaskScore/TaskScore";

export default function Experience() {
  return (
    <div className="experience_container">
      <div className="tasks-experience_container">
        <div className="category_tasks">
          <TaskScore score={7} title={"health"} selectClass={"healt"} />
          <TaskScore score={7} title={"work"} selectClass={"work"} />
          <TaskScore score={7} title={"study"} selectClass={"study"} />
          <TaskScore score={7} title={"other"} selectClass={"other"} />
        </div>
        <div className="importance_tasks">
          <TaskScore score={1} title={"no important"} />
          <TaskScore score={6} title={"les important"} />
          <TaskScore score={11} title={"medium"} />
          <TaskScore score={9} title={"important"} />
          <TaskScore score={6} title={"very important"} />
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
