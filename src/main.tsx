// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { useRef, useEffect } from 'react';
import { watchUserLocation } from './utils/geolocation';
import { useMapStore } from './store/mapStore';
import { useShallow } from 'zustand/shallow';

export const queryClient = new QueryClient();

const LocationWatcher = () => {
  const watchIdRef = useRef<number | null>(null);

  const { setUserLatLng } = useMapStore(
    useShallow((state) => ({
      setUserLatLng: state.setUserLatLng,
    }))
  );

  useEffect(() => {
    watchIdRef.current = watchUserLocation(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLatLng({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('위치 추적 중 에러 발생:', error.message);
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
