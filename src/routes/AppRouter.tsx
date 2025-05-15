import { Route, Routes } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import Solmap from '../pages/Solmap';
import CategoryButtonList from '../components/BottomSheet/Category/CategoryButtonList';
import PreviewContentList from '../components/BottomSheet/Preview/PreviewContentList';
import DetailContent from '../components/BottomSheet/DetailContent';
import ReviewsPage from '../pages/ReviewsPage';
import PreviewContentEmpty from '../components/BottomSheet/Preview/PreviewContentEmpty';
import ReviewWrite from '../components/BottomSheet/ReviewWrite/ReviewWrite';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route path='sollect' element={<></>} />
        <Route path='map' element={<Solmap />}>
          <Route index element={<CategoryButtonList />} />
          <Route path='list' element={<PreviewContentList />} />
          <Route path='not-found' element={<PreviewContentEmpty />} />
          <Route path='detail/:placeId' element={<DetailContent />} />
          <Route path='reviews/:placeId' element={<ReviewsPage />} />
          <Route path='review-write/:placeId' element={<ReviewWrite />} />
        </Route>
        <Route path='mark' element={<></>} />
        <Route path='profile' element={<></>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
