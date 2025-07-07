import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const AppLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <main className="relative flex-1 overflow-auto pb-60">
        <Outlet />
      </main>
      <div className="fixed bottom-0 inset-x-0 z-50 h-60">
        <BottomNav />
      </div>
    </div>
  );
};

export default AppLayout;