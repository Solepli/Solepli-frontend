import { Route, Routes } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import Solmap from '../pages/Solmap';
import CategoryButtonList from '../components/BottomSheet/Category/CategoryButtonList';
import PreviewContentList from '../components/BottomSheet/Preview/PreviewContentList';
import DetailContent from '../components/BottomSheet/DetailContent';
import ReviewsPage from '../pages/ReviewsPage';
<<<<<<< HEAD
import PreviewCotentEmpty from '../components/BottomSheet/Preview/PreviewCotentEmpty';
=======
import PreviewContentEmpty from '../components/BottomSheet/Preview/PreviewContentEmpty';
>>>>>>> 2de9e2db47b1304359ab32ea980255a04ed0cf5a

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route path='sollect' element={<></>} />
        <Route path='map' element={<Solmap />}>
          <Route index element={<CategoryButtonList />} />
          <Route path='list' element={<PreviewContentList />} />
<<<<<<< HEAD
          <Route path='not-found' element={<PreviewCotentEmpty />} />
=======
          <Route path='not-found' element={<PreviewContentEmpty />} />
>>>>>>> 2de9e2db47b1304359ab32ea980255a04ed0cf5a
          <Route path='detail' element={<DetailContent />} />
          <Route path='reviews/:placeId' element={<ReviewsPage />} />
        </Route>
        <Route path='mark' element={<></>} />
        <Route path='profile' element={<></>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
