// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
    toastStyle={{ background: 'transparent', boxShadow: 'none', }}
    style={{ bottom: '3rem',}}
    />
  </>
  // </StrictMode>,
);
