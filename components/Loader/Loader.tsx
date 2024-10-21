import ClipLoader from "react-spinners/ClipLoader";

export default function Loader() {
  return (
    <ClipLoader
      color="#ffa868"
      loading={true}
      size={60}
      speedMultiplier={0.4}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
