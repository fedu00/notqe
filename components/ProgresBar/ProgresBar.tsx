import "./ProgresBar.css";

export default function ProgresBar({ percentage }) {
  return (
    <div className="progres_bar_background">
      <div className="progres_bar_fill" style={{ width: percentage }}></div>
      <p>{percentage}</p>
    </div>
  );
}
