import "./signup.css";

export default function SignUpPage() {
  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form>
        <input type="text" placeholder="test1" />
        <input type="text" placeholder="test2" />
        <button type="submit">create account</button>
      </form>
    </div>
  );
}
