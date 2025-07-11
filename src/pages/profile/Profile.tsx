import { useShallow } from 'zustand/shallow';
import profile from '../../assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from '../../components/Profile/ProfileMenu';
import useAuthStore from '../../store/authStore';
import { fetchProfile } from '../../api/profileApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const Profile = () => {
  const navigate = useNavigate();

  const isLoggedIn = useAuthStore(useShallow((state) => state.isLoggedIn));

  const { setUserInfo, nickname, profileImageUrl } = useAuthStore(
    useShallow((state) => ({
      nickname: state.nickname,
      profileImageUrl: state.profileImageUrl,
      setUserInfo: state.setUserInfo,
    }))
  );

  // 유저 정보 받아오기 필요
  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchProfile,
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (userProfile) {
      const { loginType, nickname, profileImageUrl } = userProfile;
      setUserInfo({ loginType, nickname, profileImageUrl });
    }
  }, [userProfile, setUserInfo]);

  return (
    <>
      {isLoggedIn ? (
        // 회원
        <>
          <div className='h-260 flex flex-col justify-center items-center text-center bg-primary-100'>
            <img
              src={profileImageUrl || profile}
              alt='profile'
              className='mb-16 w-100 h-100 object-cover rounded-full'
            />

            <p className='font-semibold text-primary-950 mb-4'>{nickname}</p>
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
