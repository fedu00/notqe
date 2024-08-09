import ProgresBar from "../ProgresBar/ProgresBar";
import styles from "./UserExperience.module.css";
import { DoneTasksType } from "@/types/types";

type CurrentLvlInformationType =
  | {
      currentLvl: number;
      lvlProgres: number;
      taskForNextLvl: string;
    }
  | undefined;

export default function UserExperience({
  doneTasksData,
  darkMode,
}: {
  doneTasksData: DoneTasksType;
  darkMode: boolean;
}) {
  const doneTasks: number =
    doneTasksData.veryImportant +
    doneTasksData.important +
    doneTasksData.medium +
    doneTasksData.lesImportant +
    doneTasksData.noImportant;

  const getCurrentLvlInformation = (
    doneTasks: number
  ): CurrentLvlInformationType => {
    let lvlRequirement = 6;
    let requiredPointsForNextLvl = 6;
    for (let lvl = 0; lvl < 99999; lvl++) {
      if (doneTasks >= requiredPointsForNextLvl) {
        lvlRequirement = lvlRequirement + 2;
        requiredPointsForNextLvl = requiredPointsForNextLvl + lvlRequirement;
      } else {
        const doneTasksOnThisLvl =
          doneTasks - (requiredPointsForNextLvl - lvlRequirement);
        const lvlProgres = Math.floor(
          (doneTasksOnThisLvl / lvlRequirement) * 100
        );
        return {
          currentLvl: lvl,
          lvlProgres,
          taskForNextLvl: `${doneTasksOnThisLvl}/${lvlRequirement}`,
        };
      }
    }
  };

  const currentLvlInformation = getCurrentLvlInformation(doneTasks);
  const { currentLvl, lvlProgres, taskForNextLvl } = currentLvlInformation!;

  return (
    <div
      className={`${styles.user_experience_container} ${
        darkMode && styles.user_experience_container_dark
      } `}
    >
      <div
        className={`${styles.lvl_container} ${
          darkMode && styles.lvl_container_dark
        } `}
      >
        <h1>{currentLvl}</h1>
        <p>lvl</p>
      </div>
      <ProgresBar percentage={lvlProgres} darkMode={darkMode} />
      <p
        className={`${styles.tasks_on_lvl} ${
          darkMode && styles.tasks_on_lvl_dark
        } `}
      >
        tasks for next lvl: {taskForNextLvl}
      </p>
      <p
        className={`${styles.tasks_on_lvl} ${
          darkMode && styles.tasks_on_lvl_dark
        } `}
      >
        total done tasks: {doneTasks}
      </p>
    </div>
  );
}
