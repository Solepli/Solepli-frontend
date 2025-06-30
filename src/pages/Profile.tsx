import { useShallow } from "zustand/shallow";
import useAuthStore from "../store/authStore";

const Profile = () => {
    const { logout } = useAuthStore(useShallow((state) => ({
        logout: state.logout,
    })));
  return (
    <div>
      <h1>Sollect</h1>
      <button onClick={logout}>로그아웃</button>
      <p>Sollect page content goes here.</p>
    </div>
  );
}
export default Profile;