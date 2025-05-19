import Kakao from '../assets/logoKakaoTalk.svg?react';
import Naver from '../assets/logoNaver.svg?react';
import Google from '../assets/logoGoogle.svg?react';
import { useNavigate } from 'react-router-dom';

const LoginModal = () => {
    const navigate = useNavigate();
    const handleClose = () => {
        navigate(-1);
    };
  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center bg-[#181818CC]'>
      <div
        className='w-320 h-400 z-100 rounded-xl'
        style={{
    background:
      `radial-gradient(43.59% 60.05% at 100% 100.13%, rgba(67, 74, 97, 0.50) 0%, rgba(18, 18, 18, 0.00) 100%), 
       radial-gradient(36.59% 44.28% at -1.33% 71.11%, rgba(67, 74, 97, 0.50) 0%, rgba(18, 18, 18, 0.00) 100%), 
       radial-gradient(101.36% 115.55% at 98.33% 0.13%, #434A61 0%, #181818 100%)`
        }}>
        <div className='flex flex-col pt-50 px-30 pb-30'>
          <div className='flex flex-col gap-50 pb-40'>
            <div className='w-full h-42 text-white text-center text-sm font-medium'>
              쏠플러가 되시면
              <br />
              자유롭게 의견을 낼 수 있습니다!
            </div>
            <div className='w-full inline-flex flex-col justify-start items-center gap-12'>
              <div className='self-stretch h-50 px-16 bg-white/5 rounded-lg outline outline-1 outline-offset-[-1px] outline-white/50 backdrop-blur-[5px] inline-flex justify-start items-center gap-10'>
                <Kakao />
                <div className='flex-1 text-center text-white text-sm font-medium'>
                  카카오로 시작하기
                </div>
              </div>

              <div className='self-stretch h-50 px-16 bg-white/5 rounded-lg outline outline-1 outline-offset-[-1px] outline-white/50 backdrop-blur-[5px] inline-flex justify-start items-center gap-10'>
                <Naver />
                <div className='flex-1 text-center text-white text-sm font-medium'>
                  네이버로 시작하기
                </div>
              </div>

              <div className='self-stretch h-50 px-16 bg-white/5 rounded-lg outline outline-1 outline-offset-[-1px] outline-white/50 backdrop-blur-[5px] inline-flex justify-start items-center gap-10'>
                <Google />
                <div className='flex-1 text-center text-white text-sm font-medium'>
                  구글로 시작하기
                </div>
              </div>
            </div>
          </div>
          <div className='text-right text-grayScale-200 text-xs font-normal' onClick={handleClose}>
            취소
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
