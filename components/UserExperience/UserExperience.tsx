import "./UserExperience.scss";
import { DoneTasksType } from "@/types/DoneTasksType";

interface CurrentLvlInformationType {
  currentLvl: number;
  lvlProgresInPercent: number;
  taskForNextLvl: string;
}

const inicialLvlValue: number = 6;
const maxlvl: number = 99999;
const nextLvlIncreasePoints: number = 2;

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
  ): CurrentLvlInformationType | undefined => {
    let currentLvlPointsRequirement = inicialLvlValue;
    let nextLvlPointsRequirement = inicialLvlValue;
    for (let currentlvl = 0; currentlvl < maxlvl; currentlvl++) {
      if (doneTasks >= nextLvlPointsRequirement) {
        currentLvlPointsRequirement =
          currentLvlPointsRequirement + nextLvlIncreasePoints;
        nextLvlPointsRequirement =
          nextLvlPointsRequirement + currentLvlPointsRequirement;
      } else {
        const doneTasksOnThisLvl =
          doneTasks - (nextLvlPointsRequirement - currentLvlPointsRequirement);
        const lvlProgresInPercent = Math.floor(
          (doneTasksOnThisLvl / currentLvlPointsRequirement) * 100
        );
        return {
          currentLvl: currentlvl,
          lvlProgresInPercent,
          taskForNextLvl: `${doneTasksOnThisLvl}/${currentLvlPointsRequirement}`,
        };
      }
    }
  };

  const currentLvlInformation = getCurrentLvlInformation(doneTasks);
  const { currentLvl, lvlProgresInPercent, taskForNextLvl } =
    currentLvlInformation!;

  return (
    <div className="user-experience theme-background">
      <div className="user-experience__lvl-container">
        <h3 className="user-experience__lvl-value">{currentLvl}</h3>
        <p className="user-experience__lvl">lvl</p>
      </div>
      <div className="user-experience__progres-bar-background">
        <div
          className="user-experience__progres-bar-fill"
          style={{
            backgroundImage: `linear-gradient(to right, #ffa768c5 ${lvlProgresInPercent}%, rgba(0, 0, 0, 0) ${lvlProgresInPercent}%)`,
          }}
        ></div>
        <p className="user-experience__progres-bar-value">
          {lvlProgresInPercent}%
        </p>
      </div>
      <p className="user-experience__tasks">
        tasks for next lvl: {taskForNextLvl}
      </p>
      <p className="user-experience__tasks">total done tasks: {doneTasks}</p>
    </div>
  );
}
