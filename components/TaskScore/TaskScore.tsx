import "./TaskScore.css";

interface TaskScoreType {
  score: string | number;
  title: string;
  selectClass?: string;
}

export default function TaskScore({
  score,
  title,
  selectClass,
}: TaskScoreType) {
  return (
    <div className="task_score_container">
      <h4 className={selectClass}>{title}</h4>
      <p>{score}</p>
    </div>
  );
}
