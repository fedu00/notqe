import ProgresBar from "../ProgresBar/ProgresBar";
import "./UserExperience.css";

interface currentLvlInformationType {
  currentLvl: number;
  lvlProgres: string;
  taskForNextLvl: number;
}

export default function UserExperience({ doneTasksData }) {
  const doneTasks =
    doneTasksData.veryImportant +
    doneTasksData.important +
    doneTasksData.medium +
    doneTasksData.lesImportant +
    doneTasksData.noImportant;

  const getCurrentLvlInformation = (doneTasks: number) => {
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
  const currentLvlInformation: currentLvlInformationType =
    getCurrentLvlInformation(doneTasks);
  const { currentLvl, lvlProgres, taskForNextLvl } = currentLvlInformation;

  return (
    <div className="user_experience_container">
      <div className="lvl_container">
        <h1>{currentLvl}</h1>
        <p>lvl</p>
      </div>
      <ProgresBar percentage={lvlProgres} />
      <p className="tasks_on_lvl">tasks for nextt lvl: {taskForNextLvl}</p>
      <p className="tasks_on_lvl">total done tasks: {doneTasks}</p>
    </div>
  );
}
