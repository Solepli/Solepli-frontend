import Kakao from '../assets/logoKakaoTalk.svg?react';
import Naver from '../assets/logoNaver.svg?react';
import Google from '../assets/logoGoogle.svg?react';
import useLocationStore from '../store/locationStore';
import { useShallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

const LoginButtons = () => {
  const navigate = useNavigate();
  const { background } = useLocationStore(
    useShallow((state) => ({
      background: state.background,
    }))
  );

  const login = (url: string) => {
    if (background) {
      navigate(background.pathname, { replace: true });
    }
    setTimeout(() => {
      window.location.href = url;
    }, 0);
  };

  // 카카오 로그인 처리
  const signupWithKakao = () => {
    const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    return `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };
  // 네이버 로그인 처리
  const signupWithNaver = () => {
    const CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=STATE_STRING`;
  };
  // 구글 로그인 처리
  const signupWithGoogle = () => {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    return `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;
  };

  return (
    <div className='w-full inline-flex flex-col justify-start items-center gap-12'>
      <div
        className='self-stretch h-50 px-16 bg-white/5 rounded-lg outline outline-1 outline-offset-[-1px] outline-white/50 backdrop-blur-[5px] inline-flex justify-start items-center gap-10'
        onClick={() => login(signupWithKakao())}>
        <Kakao />
        <div className='flex-1 text-center text-white text-sm font-medium'>
          카카오로 시작하기
        </div>
      </div>

      <div
        className='self-stretch h-50 px-16 bg-white/5 rounded-lg outline outline-1 outline-offset-[-1px] outline-white/50 backdrop-blur-[5px] inline-flex justify-start items-center gap-10'
        onClick={() => login(signupWithNaver())}>
        <Naver />
        <div className='flex-1 text-center text-white text-sm font-medium'>
          네이버로 시작하기
        </div>
      </div>

      <div
        className='self-stretch h-50 px-16 bg-white/5 rounded-lg outline outline-1 outline-offset-[-1px] outline-white/50 backdrop-blur-[5px] inline-flex justify-start items-center gap-10'
        onClick={() => login(signupWithGoogle())}>
        <Google />
        <div className='flex-1 text-center text-white text-sm font-medium'>
          구글로 시작하기
        </div>
      </div>
    </div>
  );
};

export default LoginButtons;
