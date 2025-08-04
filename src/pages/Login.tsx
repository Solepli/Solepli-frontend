import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBackground from '../assets/loginBackground.jpg';
import Logo from '../assets/SolepliLogoLogin.svg?react';
import LoginButtons from '../auth/LoginButtons';
import { useShallow } from 'zustand/shallow';
import useAuthStore from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore(
    useShallow((state) => ({
      logout: state.logout,
    }))
  );
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onClick = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div
      className='h-dvh w-full flex flex-col justify-center items-center'
      style={{
        backgroundImage: `linear-gradient(rgba(24, 24, 24, 0.75), rgba(24, 24, 24, 0.75)), url(${loginBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      {/* 콘텐츠 */}
      <div className='flex-3 flex justify-center items-center w-full'>
        <Logo />
      </div>

      {showButtons && (
        <div className='flex-2 w-full px-36'>
          <LoginButtons />
          <div
            className='text-grayScale-400 text-xs font-medium underline leading-none text-center pt-24 button'
            onClick={onClick}>
            비회원으로 이용하기
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
