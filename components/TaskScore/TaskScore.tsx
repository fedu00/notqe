import "./TaskScore.scss";

interface TaskScoreType {
  score: number;
  title: string;
  selectedClass?: string;
}

export default function TaskScore({
  score,
  title,
  selectedClass,
}: TaskScoreType) {
  return (
    <div className="task-score theme-background">
      <h4 className={`task-score__title task-score__title--${selectedClass}`}>
        {title}
      </h4>
      <p className="task-score__score">{score}</p>
    </div>
  );
}
