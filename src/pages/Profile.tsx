import { useShallow } from 'zustand/shallow';
import useAuthStore from '../store/authStore';
import ProfileMenu from '../components/Profile/ProfileMenu';

const Profile = () => {
  const { logout } = useAuthStore(
    useShallow((state) => ({
      logout: state.logout,
    }))
  );

  const isLoggedIn = useAuthStore(useShallow((state) => state.isLoggedIn));
  return (
    <>
      {isLoggedIn ? (
        // 회원
        <>
          <div className='h-260 font-semibold flex justify-center items-center text-center bg-primary-100'></div>
        </>
      ) : (
        // 비회원
        <>
          <div className='h-260 font-semibold flex justify-center items-center text-center bg-primary-100'>
            <div>
              <p>쏠플러가 되면</p>
              <p>더 많은 정보를 얻을 수 있습니다!</p>
            </div>
          </div>

        </>
      )}
      <ProfileMenu isLoggedIn={isLoggedIn}/>

      {/* <h1>Sollect</h1>
      <button onClick={logout}>로그아웃</button>
      <p>Sollect page content goes here.</p> */}
    </>
  );
};
export default Profile;
