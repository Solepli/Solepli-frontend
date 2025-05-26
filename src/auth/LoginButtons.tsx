import Kakao from '../assets/logoKakaoTalk.svg?react';
import Naver from '../assets/logoNaver.svg?react';
import Google from '../assets/logoGoogle.svg?react';

const LoginButtons = () => {
  // 카카오 로그인 처리
  const signupWithKakao = () => {
    const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };
  // 네이버 로그인 처리
  const signupWithNaver = () => {
    const CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=STATE_STRING`;
    window.location.href = NAVER_AUTH_URL;
  };
  // 구글 로그인 처리
  const signupWithGoogle = () => {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <div className='w-full inline-flex flex-col justify-start items-center gap-12'>
      <div
        className='self-stretch h-50 px-16 bg-white/5 rounded-lg outline outline-1 outline-offset-[-1px] outline-white/50 backdrop-blur-[5px] inline-flex justify-start items-center gap-10'
        onClick={signupWithKakao}>
        <Kakao />
        <div className='flex-1 text-center text-white text-sm font-medium'>
          카카오로 시작하기
        </div>
      </div>

      <div
        className='self-stretch h-50 px-16 bg-white/5 rounded-lg outline outline-1 outline-offset-[-1px] outline-white/50 backdrop-blur-[5px] inline-flex justify-start items-center gap-10'
        onClick={signupWithNaver}>
        <Naver />
        <div className='flex-1 text-center text-white text-sm font-medium'>
          네이버로 시작하기
        </div>
      </div>

      <div
        className='self-stretch h-50 px-16 bg-white/5 rounded-lg outline outline-1 outline-offset-[-1px] outline-white/50 backdrop-blur-[5px] inline-flex justify-start items-center gap-10'
        onClick={signupWithGoogle}>
        <Google />
        <div className='flex-1 text-center text-white text-sm font-medium'>
          구글로 시작하기
        </div>
      </div>
    </div>
  );
};

export default LoginButtons;
