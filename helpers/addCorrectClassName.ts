export const addCorrectClassName = (category, styles) => {
  switch (category) {
    case "health":
      return styles.health;
    case "work":
      return styles.work;
    case "study":
      return styles.study;
    case "other":
      return styles.other;
  }
};
