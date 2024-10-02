import "./ErrorMessage.scss";
interface ErrorMessageType {
  errorMessage?: string;
  showError: boolean;
}

export default function ErrorMessage({
  errorMessage,
  showError,
}: ErrorMessageType) {
  return (
    <div className="error">
      {showError && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
