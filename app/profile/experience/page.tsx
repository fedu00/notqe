"use client";
import "./experience.css";
import { DoneTasksType } from "@/types/types";
import { useState, useEffect } from "react";
import { DONE_TASKS_DATA } from "@/constans/constans";
import { getdataFromSessionStorage } from "@/helpers/getDataFromSessionStorage";
import { useDarkModeContext } from "@/context/userContext";
import UserExperience from "@/components/UserExperience/UserExperience";
import ClipLoader from "react-spinners/ClipLoader";
import TaskScore from "@/components/TaskScore/TaskScore";

export default function Experience() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [doneTasksData, setDoneTasksData] =
    useState<DoneTasksType>(DONE_TASKS_DATA);

  const { darkMode } = useDarkModeContext();

  useEffect(() => {
    getdataFromSessionStorage(
      "userNotqeDoneTasks",
      setIsLoading,
      setDoneTasksData
    );
  }, []);

  const { categories, importanceLevel } = doneTasksData;
  const { health, other, study, work } = categories;
  const {
    noImportant,
    lessImportant,
    mediumImportant,
    important,
    veryImportant,
  } = importanceLevel;

  return (
    <div className={"experience_container"}>
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
          <div className={"tasks_experience_container"}>
            <div
              className={`tasks_score_container  ${
                darkMode && "tasks_score_container_dark"
              }`}
            >
              <TaskScore
                score={health}
                title={"health"}
                selectedClass={"health"}
              />
              <TaskScore score={work} title={"work"} selectedClass={"work"} />
              <TaskScore
                score={study}
                title={"study"}
                selectedClass={"study"}
              />
              <TaskScore
                score={other}
                title={"other"}
                selectedClass={"other"}
              />
            </div>
            <div
              className={`tasks_score_container ${
                darkMode && "tasks_score_container_dark"
              }`}
            >
              <TaskScore score={noImportant} title={"no important"} />
              <TaskScore score={lessImportant} title={"less important"} />
              <TaskScore score={mediumImportant} title={"medium"} />
              <TaskScore score={important} title={"important"} />
              <TaskScore score={veryImportant} title={"very important"} />
            </div>
          </div>
          <UserExperience
            doneTasksData={doneTasksData}
            darkModeClass={darkMode ? "user_experience_container_dark" : ""}
          />
        </>
      )}
    </div>
  );
}
