import { useShallow } from 'zustand/shallow';
import profile from '../../assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from '../../components/Profile/ProfileMenu';
import useAuthStore from '../../store/authStore';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore(
    useShallow((state) => ({
      logout: state.logout,
    }))
  );

  // 유저 정보 받아오기 필요

  const isLoggedIn = useAuthStore(useShallow((state) => state.isLoggedIn));
  return (
    <>
      {isLoggedIn ? (
        // 회원
        <>
          <div className='h-260 flex flex-col justify-center items-center text-center bg-primary-100'>
            <img src={profile} alt='profile' className='mb-16' />
            <p className='font-semibold text-primary-950 mb-4'>이름</p>
            <p
              className='text-sm text-primary-700 underline'
              onClick={() => navigate('/profile/edit')}>
              프로필 수정
            </p>
          </div>
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
      <ProfileMenu isLoggedIn={isLoggedIn} />

     

      {/* <h1>Sollect</h1>
      <button onClick={logout}>로그아웃</button>
      <p>Sollect page content goes here.</p> */}
    </>
  );
};
export default Profile;
