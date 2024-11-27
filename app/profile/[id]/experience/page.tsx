import "./experience.scss";
import UserExperience from "@/components/UserExperience/UserExperience";
import TaskScore from "@/components/TaskScore/TaskScore";
import { getUserDetails } from "@/helpers/getUserDetails";

export default async function Experience() {
  const { doneTasks } = await getUserDetails();
  const { categories, importanceLevel } = doneTasks;
  const { health, other, study, work } = categories;
  const {
    noImportant,
    lessImportant,
    mediumImportant,
    important,
    veryImportant,
  } = importanceLevel;

  return (
    <div className="experience">
      <>
        <div className="experience__scores-container">
          <div className="experience__scores-group">
            <TaskScore
              score={health}
              title={"health"}
              selectedClass={"health"}
            />
            <TaskScore score={work} title={"work"} selectedClass={"work"} />
            <TaskScore score={study} title={"study"} selectedClass={"study"} />
            <TaskScore score={other} title={"other"} selectedClass={"other"} />
          </div>
          <div className="experience__scores-group">
            <TaskScore score={noImportant} title={"no important"} />
            <TaskScore score={lessImportant} title={"less important"} />
            <TaskScore score={mediumImportant} title={"medium"} />
            <TaskScore score={important} title={"important"} />
            <TaskScore score={veryImportant} title={"very important"} />
          </div>
        </div>
        <UserExperience doneTasksData={doneTasks} />
      </>
    </div>
  );
}
