import { useNavigate } from 'react-router-dom';
import LoginButtons from './LoginButtons';
import useLocationStore from '../store/locationStore';
import { useShallow } from 'zustand/shallow';

const LoginModal = () => {
  const navigate = useNavigate();
  const { background, clearLocation } = useLocationStore(
    useShallow((state) => ({
      background: state.background,
      clearLocation: state.clearLocation,
    }))
  );
  const handleClose = () => {
    const prevBackground = background;
    clearLocation();
    if (prevBackground && prevBackground.pathname) {
      navigate(prevBackground.pathname, {replace: true});
    } else {
      navigate(-1);
    }
  };

  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center bg-[#181818CC]'>
      <div
        className='w-320 h-400 z-100 rounded-xl'
        style={{
          background: `radial-gradient(43.59% 60.05% at 100% 100.13%, rgba(67, 74, 97, 0.50) 0%, rgba(18, 18, 18, 0.00) 100%), 
       radial-gradient(36.59% 44.28% at -1.33% 71.11%, rgba(67, 74, 97, 0.50) 0%, rgba(18, 18, 18, 0.00) 100%), 
       radial-gradient(101.36% 115.55% at 98.33% 0.13%, #434A61 0%, #181818 100%)`,
        }}>
        <div className='flex flex-col pt-50 px-30 pb-30'>
          <div className='flex flex-col gap-50 pb-40'>
            <div className='w-full h-42 text-white text-center text-sm font-medium'>
              쏠플러가 되시면
              <br />
              자유롭게 의견을 낼 수 있습니다!
            </div>
            <LoginButtons />
          </div>
          <div
            className='text-right text-grayScale-200 text-xs font-normal button'
            onClick={handleClose}>
            취소
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
