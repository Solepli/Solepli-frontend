// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { useRef, useEffect } from 'react';
// import { watchUserLocation } from './utils/geolocation';
import { useMapStore } from './store/mapStore';
import { useShallow } from 'zustand/shallow';

export const queryClient = new QueryClient();

const LocationWatcher = () => {
  const watchIdRef = useRef<number | null>(null);

  const { setLocationAccessStatus, setUserLatLng } = useMapStore(
    useShallow((state) => ({
      setLocationAccessStatus: state.setLocationAccessStatus,
      setUserLatLng: state.setUserLatLng,
    }))
  );

  useEffect(() => {
    // 위치 권한 확인 및 요청
    if (!navigator.geolocation) {
      console.error('Geolocation이 지원되지 않는 브라우저입니다.');
      setLocationAccessStatus(false);
      return;
    }

    // 먼저 현재 위치를 한 번 가져오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLatLng({ lat: latitude, lng: longitude });
        setLocationAccessStatus(true);
        // watchIdRef.current = navigator.geolocation.watchPosition(
        //   (onSuccess) => {
        //     const { latitude, longitude } = onSuccess.coords;
        //     setUserLatLng({ lat: latitude, lng: longitude });
        //   },
        //   (error) => {
        //     console.error('위치 추적 중 에러 발생:', error.message);
        //   },
        //   {
        //     enableHighAccuracy: true,
        //   }
        // );
      },
      (error) => {
        console.error(
          '위치 권한 거부 또는 위치를 가져올 수 없습니다:',
          error.message
        );
        setUserLatLng({ lat: 37.5666805, lng: 126.9784147 });
        setLocationAccessStatus(false);
      },
      {
        enableHighAccuracy: true,
        // timeout: 10000,
        // maximumAge: 60000,
      }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [setUserLatLng]);

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
