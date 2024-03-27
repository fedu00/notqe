import "./Button.css";
interface ButtonType {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "submit" | "reset" | "button";
  test?: boolean;
}

export default function Button({
  text,
  onClick = undefined,
  type,
  test,
}: ButtonType) {
  return (
    <button
      type={type}
      className={`${test ? "test_button" : ""} button`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
