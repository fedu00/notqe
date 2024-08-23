import "./TaskScore.css";

interface TaskScoreType {
  score: string | number;
  title: string;
  selectedClass?: string;
}

export default function TaskScore({
  score,
  title,
  selectedClass,
}: TaskScoreType) {
  return (
    <div className={"task_score_container"}>
      <h4 className={selectedClass}>{title}</h4>
      <p>{score}</p>
    </div>
  );
}
