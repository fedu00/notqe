"use client";
import "./experience.scss";
import React, { Suspense } from "react";
import { useEffect } from "react";
import UserExperience from "@/components/UserExperience/UserExperience";
import TaskScore from "@/components/TaskScore/TaskScore";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  getUserDoneTasks,
  getUserLoadingState,
} from "@/redux/slices/userSlice/userSelectors";
import { fetchUserDetails } from "@/redux/slices/userSlice/userThunk/fetchUserDetails";
import Loader from "@/components/Loader/Loader";
import { LoadingStates } from "@/redux/slices/userSlice/UserSliceInitialState.Type";

export default function Experience() {
  const loading = useAppSelector(getUserLoadingState);
  const dispatch = useAppDispatch();
  const doneTasks = useAppSelector(getUserDoneTasks);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const { categories, importanceLevel } = doneTasks;
  const { health, other, study, work } = categories;
  const {
    noImportant,
    lessImportant,
    mediumImportant,
    important,
    veryImportant,
  } = importanceLevel;

  if (loading === LoadingStates.PENDING) return <Loader />;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="experience">
        <>
          <div className="experience__scores-container">
            <div className="experience__scores-group">
              <TaskScore score={health} title="health" selectedClass="health" />
              <TaskScore score={work} title="work" selectedClass="work" />
              <TaskScore score={study} title="study" selectedClass="study" />
              <TaskScore score={other} title="other" selectedClass="other" />
            </div>
            <div className="experience__scores-group">
              <TaskScore score={noImportant} title="no important" />
              <TaskScore score={lessImportant} title="less important" />
              <TaskScore score={mediumImportant} title="medium" />
              <TaskScore score={important} title="important" />
              <TaskScore score={veryImportant} title="very important" />
            </div>
          </div>
          <UserExperience doneTasksData={doneTasks} />
        </>
      </div>
    </Suspense>
  );
}
