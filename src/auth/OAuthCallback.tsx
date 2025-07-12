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
  const { targetSource, background, clearLocation } = useLocationStore(
    useShallow((state) => ({
      targetSource: state.targetSource,
      background: state.background,
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
        const prevBackground = background;
        clearLocation();

        // Redirect to the desired page after successful login
        if (target) {
          // If there is a target source, redirect to that page
          navigate(target || '/', { state: undefined, replace: true });
        } else if (prevBackground) {
          navigate(-1);
          // navigate(prevBackground || '/', { state: undefined, replace: true });
        } else {
          navigate('/', { state: undefined, replace: true });
        }
      })
      .catch((error) => {
        console.error('Error during OAuth callback:', error);
        // Handle error (e.g., show an error message to the user)
      });
  }, [
    background,
    clearLocation,
    code,
    login,
    loginType,
    navigate,
    targetSource,
  ]);

  return <div>Loading...</div>;
};
export default OAuthCallback;
