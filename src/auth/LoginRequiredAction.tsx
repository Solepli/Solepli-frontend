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
  const { setTargetSource, setPreviousLocation } = useLocationStore(
    useShallow((state) => ({
      setTargetSource: state.setTargetSource,
      setPreviousLocation: state.setPreviousLocation,
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
      } else {
        setPreviousLocation(location);
      }
      navigate('/login-modal', {
        state: { modal: true, background: location },
      });
    }
  };

  return <div onClick={handleAction}>{children}</div>;
};

export default LoginRequiredAction;
