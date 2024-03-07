import "./profile.css";

export default function ProfilePage({ children }: any) {
  return (
    <div className="profile-container">
      <h1>welcome on your account</h1>
      {children}
    </div>
  );
}
