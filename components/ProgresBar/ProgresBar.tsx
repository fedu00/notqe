import styles from "./ProgresBar.module.css";

export default function ProgresBar({
  percentage,
  darkMode,
}: {
  percentage: number;
  darkMode: boolean;
}) {
  return (
    <div className={styles.progres_bar_background}>
      <div
        className={styles.progres_bar_fill}
        style={{
          backgroundImage: `linear-gradient(to right, #ffa768c5 ${percentage}%, rgba(0, 0, 0, 0) ${percentage}%)`,
        }}
      ></div>
      <p className={`${darkMode && styles.percentage_dark}`}>{percentage}%</p>
    </div>
  );
}
