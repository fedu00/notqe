"use client";
import "./experience.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import UserExperience from "@/components/UserExperience/UserExperience";
import ClipLoader from "react-spinners/ClipLoader";
import TaskScore from "@/components/TaskScore/TaskScore";

export default function Experience() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userData } = useSelector((state: RootState) => state);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const { categories, importanceLevel } = userData.doneTasks;
  const { health, other, study, work } = categories;
  const {
    noImportant,
    lessImportant,
    mediumImportant,
    important,
    veryImportant,
  } = importanceLevel;

  return (
    <div className="experience_container">
      {isLoading ? (
        <ClipLoader
          color="#ffa868"
          loading={true}
          size={60}
          speedMultiplier={0.4}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <div className="tasks_experience_container">
            <div className="tasks_score_container">
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
            <div className="tasks_score_container">
              <TaskScore score={noImportant} title={"no important"} />
              <TaskScore score={lessImportant} title={"less important"} />
              <TaskScore score={mediumImportant} title={"medium"} />
              <TaskScore score={important} title={"important"} />
              <TaskScore score={veryImportant} title={"very important"} />
            </div>
          </div>
          <UserExperience doneTasksData={userData.doneTasks} />
        </>
      )}
    </div>
  );
}
