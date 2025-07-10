import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useShallow } from 'zustand/shallow';
import useLocationStore from '../store/locationStore';
import { publicAxios } from '../api/axios';
import { ENDPOINT } from '../api/urls';

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
    if (!loginType) {
      console.error('Login type is not specified');
      return;
    }

    publicAxios
      .get(ENDPOINT.OAUTH_CALLBACK(loginType.toUpperCase()), {
        params: { code },
      })
      .then((response) => {
        const accessToken = response.data.data.accessToken;
        const userId = response.data.data.userId;
        // Store tokens in local storage or state management
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userId', userId);

        login();

        const target = targetSource;
        const previous = previousLocation;
        clearLocation();

        navigate('/', {replace: true});

        // Redirect to the desired page after successful login
        if (target) {
          // If there is a target source, redirect to that page
          navigate(target || '/', { state: undefined, replace: true });
        } else if (previous) {
          navigate(previous || '/', { state: undefined, replace: true });
        } else {
          navigate('/', { state: undefined, replace: true });
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
