import "../profile.css";

export default function UserProfile({ params }: any) {
  return (
    <div className="user-container">
      <h3>user</h3>
      <h3>{params.id}</h3>
    </div>
  );
}
