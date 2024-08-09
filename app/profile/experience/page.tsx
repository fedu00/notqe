"use client";
import UserExperience from "@/components/UserExperience/UserExperience";
import styles from "./experience.module.css";
import TaskScore from "@/components/TaskScore/TaskScore";
import { DoneTasksType } from "@/types/types";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { DONE_TASKS_DATA } from "@/constans/constans";
import { getdataFromSessionStorage } from "@/helpers/getDataFromSessionStorage";
import { useDarkModeContext } from "@/context/userContext";

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
    <div
      className={`${styles.experience_container} ${
        darkMode && styles.experience_container_dark
      } `}
    >
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
          <div className={styles.tasks_experience_container}>
            <div className={styles.category_tasks}>
              <TaskScore
                score={health}
                title={"health"}
                selectClass={"health"}
                darkMode={darkMode}
              />
              <TaskScore
                score={work}
                title={"work"}
                selectClass={"work"}
                darkMode={darkMode}
              />
              <TaskScore
                score={study}
                title={"study"}
                selectClass={"study"}
                darkMode={darkMode}
              />
              <TaskScore
                score={other}
                title={"other"}
                selectClass={"other"}
                darkMode={darkMode}
              />
            </div>
            <div className={styles.importance_tasks}>
              <TaskScore
                score={noImportant}
                title={"no important"}
                darkMode={darkMode}
              />
              <TaskScore
                score={lesImportant}
                title={"less important"}
                darkMode={darkMode}
              />
              <TaskScore score={medium} title={"medium"} darkMode={darkMode} />
              <TaskScore
                score={important}
                title={"important"}
                darkMode={darkMode}
              />
              <TaskScore
                score={veryImportant}
                title={"very important"}
                darkMode={darkMode}
              />
            </div>
          </div>
          <UserExperience doneTasksData={doneTasksData} darkMode={darkMode} />
        </>
      )}
    </div>
  );
}
