"use client";
import "./experience.scss";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { getUserDoneTasks } from "@/redux/slices/userSlice/userSelectors";
import UserExperience from "@/components/UserExperience/UserExperience";
import Loader from "@/components/Loader/Loader";
import TaskScore from "@/components/TaskScore/TaskScore";

export default function Experience() {
  const [isLoading, setIsLoading] = useState(true);

  const doneTasks = useAppSelector(getUserDoneTasks);
  const { categories, importanceLevel } = doneTasks;
  const { health, other, study, work } = categories;
  const {
    noImportant,
    lessImportant,
    mediumImportant,
    important,
    veryImportant,
  } = importanceLevel;

  useEffect(() => {
    if (doneTasks) {
      setIsLoading(false);
    }
  }, [doneTasks]);

  return (
    <div className="experience">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="experience__scores-container">
            <div className="experience__scores-group">
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
      )}
    </div>
  );
}
