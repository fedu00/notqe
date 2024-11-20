import "./profile.scss";
import { getUserDetails } from "@/helpers/getUserDetails";

export default async function ProfilePage() {
  const { username } = await getUserDetails();
  return (
    <div className="profile theme-background">
      <h2 className="profile__title">
        Welcome on your account {username || "unknow"}
      </h2>
      <p>
        Build your future brick by brick. The NOTQE application can help you
        with this - organize your tasks and check your plans for today before
        you start taking action. Check your progress and how much work you have
        done in the "experience" tab.
      </p>
    </div>
  );
}
