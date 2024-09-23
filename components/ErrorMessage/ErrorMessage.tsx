import "./ErrorMessage.scss";
interface ErrorMessageType {
  errorMessage?: string;
}

export default function ErrorMessage({ errorMessage }) {
  return <p id="error-message">{errorMessage}</p>;
}
