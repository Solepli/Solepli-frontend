// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useMapStore } from './store/mapStore';
import { useShallow } from 'zustand/shallow';

export const queryClient = new QueryClient();

const LocationWatcher = () => {
  const { setLocationAccessStatus, setUserLatLng } = useMapStore(
    useShallow((state) => ({
      setLocationAccessStatus: state.setLocationAccessStatus,
      setUserLatLng: state.setUserLatLng,
    }))
  );

  useEffect(() => {
    /**
     * Permissions API 지원 확인
     * > 안드로이드 웹뷰는 지원하지 않음
     * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/permissions
     */
    if (!navigator.permissions) {
      console.error('위치 정보가 지원되지 않는 브라우저입니다.');
      setLocationAccessStatus(false);
      return;
    }

    // 위치 권한 요청
    const checkPermissions = async () => {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLatLng({ lat: latitude, lng: longitude });
              setLocationAccessStatus(true);
              console.log('위치 정보 접근이 허용 되었습니다.');
            },
            (error) => {
              console.error(
                '위치 정보 접근 거부 또는 위치를 가져올 수 없습니다:',
                error.message
              );
              setLocationAccessStatus(false);
            },
            {
              enableHighAccuracy: true,
            }
          );
        } else if (result.state === 'prompt') {
          navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLatLng({ lat: latitude, lng: longitude });
              setLocationAccessStatus(true);
              console.log('위치 정보 접근이 허용 되었습니다.');
            },
            (error) => {
              console.error(
                '위치 정보 접근 거부 또는 위치를 가져올 수 없습니다:',
                error.message
              );
              setLocationAccessStatus(false);
            },
            {
              enableHighAccuracy: true,
            }
          );
          console.log('navigator의 permissions를 확인 중입니다.');
        } else {
          setLocationAccessStatus(false);
          console.log(
            '위치 정보 접근이 거부 되었습니다. 위치 정보 접근을 허용해주세요.'
          );
        }
        // Don't do anything if the permission was denied.
      });
    };

    checkPermissions();
  }, [setLocationAccessStatus, setUserLatLng]);

  return null;
};

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LocationWatcher />
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
    <ToastContainer
      position='bottom-center'
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick={false}
      closeButton={false}
      toastClassName={'flex items-center justify-center'}
      toastStyle={{ background: 'transparent', boxShadow: 'none' }}
      style={{ bottom: '3rem' }}
    />
  </>
  // </StrictMode>,
);
