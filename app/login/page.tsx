import "./login.css";

export default function LoginPage() {
  return (
    <div className="login-container">
      <h2>Login your account</h2>
      <form>
        <input type="text" placeholder="test1" />
        <input type="text" placeholder="test2" />
        <button type="submit">log in</button>
      </form>
    </div>
  );
}
