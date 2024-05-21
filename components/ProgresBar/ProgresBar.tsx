import "./ProgresBar.css";

export default function ProgresBar({ percentage }: { percentage: number }) {
  return (
    <div className="progres_bar_background">
      <div
        className="progres_bar_fill"
        style={{
          backgroundImage: `linear-gradient(to right, #ffa768c5 ${percentage}%, rgba(0, 0, 0, 0) ${percentage}%)`,
        }}
      ></div>
      <p>{percentage}%</p>
    </div>
  );
}
