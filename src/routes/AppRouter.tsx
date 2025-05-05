import { Route, Routes } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route path='sollect' element={<></>} />
        <Route path='map' element={<></>} />
        <Route path='mark' element={<></>} />
        <Route path='profile' element={<></>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
