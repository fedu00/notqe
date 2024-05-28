"use client";
import UserExperience from "@/components/UserExperience/UserExperience";
import "./experience.css";
import TaskScore from "@/components/TaskScore/TaskScore";
import { DoneTasksType } from "@/types/types";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { DONE_TASKS_DATA } from "@/constans/constans";
import { getdataFromSessionStorage } from "@/helpers/getDataFromSessionStorage";

export default function Experience() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [doneTasksData, setDoneTasksData] =
    useState<DoneTasksType>(DONE_TASKS_DATA);

  useEffect(() => {
    getdataFromSessionStorage(
      "userNotqeDoneTasks",
      setIsLoading,
      setDoneTasksData
    );
  }, []);

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
          <div className="tasks-experience_container">
            <div className="category_tasks">
              <TaskScore
                score={health}
                title={"health"}
                selectClass={"health"}
              />
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
        </>
      )}
    </div>
  );
}
