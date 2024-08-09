import styles from "./TaskScore.module.css";
import { addCorrectClassName } from "@/helpers/addCorrectClassName";

interface TaskScoreType {
  score: string | number;
  title: string;
  selectClass?: string;
  darkMode: boolean;
}

export default function TaskScore({
  score,
  title,
  selectClass,
  darkMode,
}: TaskScoreType) {
  return (
    <div
      className={`${styles.task_score_container} ${
        darkMode && styles.task_score_container_dark
      } `}
    >
      <h4 className={addCorrectClassName(selectClass, styles)}>{title}</h4>
      <p>{score}</p>
    </div>
  );
}
