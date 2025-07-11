import useAuthStore from '../store/authStore';
import { useShallow } from 'zustand/shallow';

import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useLocationStore from '../store/locationStore';

interface LoginRequiredActionProps {
  children: ReactNode;
  onAction: () => void;
  targetSource?: string | undefined;
}

const LoginRequiredAction = ({
  children,
  onAction,
  targetSource,
}: LoginRequiredActionProps) => {
  const isLoggedIn = useAuthStore(useShallow((state) => state.isLoggedIn));
  const { setTargetSource, setBackground } = useLocationStore(
    useShallow((state) => ({
      setTargetSource: state.setTargetSource,
      setBackground: state.setBackground,
    }))
  );
  const navigate = useNavigate();
  const location = useLocation();

  const handleAction = () => {
    if (isLoggedIn) {
      onAction();
    } else {
      if (targetSource) {
        setTargetSource(targetSource);
      }
      setBackground(location);
      navigate('/login-modal', {
        state: { modal: true },
      });
    }
  };

  return <div onClick={handleAction}>{children}</div>;
};

export default LoginRequiredAction;
