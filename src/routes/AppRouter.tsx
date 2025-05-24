import { Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import Solmap from '../pages/Solmap';
import CategoryButtonList from '../components/BottomSheet/Category/CategoryButtonList';
import PreviewContentList from '../components/BottomSheet/Preview/PreviewContentList';
import DetailContent from '../components/BottomSheet/DetailContent';
import ReviewsPage from '../pages/ReviewsPage';
import PreviewContentEmpty from '../components/BottomSheet/Preview/PreviewContentEmpty';
import ReviewWrite from '../components/BottomSheet/ReviewWrite/ReviewWrite';
import LoginModal from '../components/LoginModal';
import RelatedSollect from '../pages/RelatedSollect';
import SollectPage from '../pages/SollectPage';
import SearchPage from '../pages/SearchPage';

const AppRouter = () => {
  const location = useLocation();
  const state = location.state as { background?: Location };

  return (
    <>
      <Routes location={state?.background || location}>
        <Route path='/' element={<AppLayout />}>
          <Route path='sollect' element={<SollectPage />} />
          <Route path='sollect/search' element={<SearchPage />} />

          <Route path='map' element={<Solmap />}>
            <Route index element={<CategoryButtonList />} />
            <Route path='list' element={<PreviewContentList />} />
            <Route path='not-found' element={<PreviewContentEmpty />} />
            <Route path='detail/:placeId' element={<DetailContent />} />
            <Route path='reviews/:placeId' element={<ReviewsPage />} />
            <Route path='review-write/:placeId' element={<ReviewWrite />} />
          </Route>
          <Route path='map/search' element={<SearchPage />} />
          <Route path='mark' element={<></>} />
          <Route path='profile' element={<></>} />
          <Route path='related-sollect' element={<RelatedSollect />} />
        </Route>
      </Routes>
      {/* Modal Routes */}
      {state?.background && (
        <Routes>
          <Route path='/login-modal' element={<LoginModal />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
