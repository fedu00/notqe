import "./UserExperience.scss";
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
}: {
  doneTasksData: DoneTasksType;
}) {
  const doneTasks: number =
    doneTasksData.categories.health +
    doneTasksData.categories.work +
    doneTasksData.categories.study +
    doneTasksData.categories.other;

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
    <div className="user-experience theme-background">
      <div className="user-experience__lvl">
        <h1>{currentLvl}</h1>
        <p>lvl</p>
      </div>
      <div className="user-experience__progres-bar-background">
        <div
          className="user-experience__progres-bar-fill"
          style={{
            backgroundImage: `linear-gradient(to right, #ffa768c5 ${lvlProgres}%, rgba(0, 0, 0, 0) ${lvlProgres}%)`,
          }}
        ></div>
        <p>{lvlProgres}%</p>
      </div>
      <p className="user-experience__tasks">
        tasks for next lvl: {taskForNextLvl}
      </p>
      <p className="user-experience__tasks">total done tasks: {doneTasks}</p>
    </div>
  );
}
