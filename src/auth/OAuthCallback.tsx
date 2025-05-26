import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useShallow } from 'zustand/shallow';
import useLocationStore from '../store/locationStore';

const OAuthCallback = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { loginType } = useParams();
  const { login } = useAuthStore(
    useShallow((state) => ({
      login: state.login,
    }))
  );
  const { targetSource, previousLocation, clearLocation } = useLocationStore(
    useShallow((state) => ({
      targetSource: state.targetSource,
      previousLocation: state.previousLocation,
      clearLocation: state.clearLocation,
    }))
  );
  const query = new URLSearchParams(search);

  const code = query.get('code');

  useEffect(() => {
    if (!code) {
      console.error('Invalid OAuth callback parameters');
      return;
    }

    axios
      .get(`http://3.34.65.130/api/auth/login/${loginType?.toUpperCase()}`, {
        params: {
          code: code,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const accessToken = response.data.data.accessToken;
        // Store tokens in local storage or state management
        localStorage.setItem('accessToken', accessToken);

        login();

        const target = targetSource;
        const previous = previousLocation;
        clearLocation();

        // Redirect to the desired page after successful login
        if (target) {
          // If there is a target source, redirect to that page
          navigate(target || '/', { replace: true });
        } else if (previous) {
          navigate(previous || '/', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      })
      .catch((error) => {
        console.error('Error during OAuth callback:', error);
        // Handle error (e.g., show an error message to the user)
      });
  }, [
    clearLocation,
    code,
    login,
    loginType,
    navigate,
    previousLocation,
    targetSource,
  ]);

  return <div>Loading...</div>;
};
export default OAuthCallback;
