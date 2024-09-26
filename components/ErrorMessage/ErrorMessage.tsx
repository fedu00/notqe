import "./ErrorMessage.scss";
interface ErrorMessageType {
  errorMessage?: string;
}

export default function ErrorMessage({ errorMessage }: ErrorMessageType) {
  return <p className="error-message">{errorMessage}</p>;
}
