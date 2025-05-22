import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { useShallow } from 'zustand/shallow';

const OAtuhCallback = () => {
  const { search } = useLocation();
  const { loginType } = useParams();
const { login } = useAuthStore(useShallow((state) => ({
    login: state.login,
  })));
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
        console.log('Response data:', response.data.data.accessToken);
        const accessToken = response.data.data.accessToken;
        // Store tokens in local storage or state management
        localStorage.setItem('accessToken', accessToken);
        login();
        window.location.href = '/map'; // Redirect to the desired page after successful login
        // Redirect to the desired page after successful login
      })
      .catch((error) => {
        console.error('Error during OAuth callback:', error);
        // Handle error (e.g., show an error message to the user)
      });
  }, [code, login, loginType]);

  return <div>Loading...</div>;
};
export default OAtuhCallback;
