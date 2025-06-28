import { Location, Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import Solmap from '../pages/Solmap';
import CategoryButtonList from '../components/BottomSheet/Category/CategoryButtonList';
import PreviewContentList from '../components/BottomSheet/Preview/PreviewContentList';
import DetailContent from '../components/BottomSheet/DetailContent';
import ReviewsPage from '../pages/ReviewsPage';
import PreviewContentEmpty from '../components/BottomSheet/Preview/PreviewContentEmpty';
import ReviewWrite from '../components/BottomSheet/ReviewWrite/ReviewWrite';
import LoginModal from '../auth/LoginModal';
import RelatedSollect from '../pages/RelatedSollect';
import SollectPage from '../pages/SollectPage';
import SearchPage from '../pages/SearchPage';
import SollectSearchResultPage from '../pages/SollectSearchResultPage';
import OAuthCallback from '../auth/OAuthCallback';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import SollectWritePage from '../pages/SollectWritePage';
import SollectWriteLayout from '../layout/SollectWriteLayout';
import SollectWritePlacePage from '../pages/SollectWritePlacePage';
import SollectDetailPage from '../pages/SollectDetailPage';

const AppRouter = () => {
  const location = useLocation();
  const background: Location = location.state?.background;
  const modal = location.state?.modal;

  return (
    <>
      {/* 모달이 아닐 땐 location으로, 모달일 땐 background로 Routes */}
      <Routes location={(modal && background) || location}>
        <Route path='/' element={<AppLayout />}>
          <Route path='sollect' element={<SollectPage />} />
          <Route path='sollect/search' element={<SearchPage />} />
          <Route
            path='sollect/search/result'
            element={<SollectSearchResultPage />}
          />
          <Route path='sollect/:sollectId' element={<SollectDetailPage />} />

          <Route path='map' element={<Solmap />}>
            <Route index element={<CategoryButtonList />} />
            <Route path='list' element={<PreviewContentList />} />
            <Route path='not-found' element={<PreviewContentEmpty />} />
            <Route path='detail/:placeId' element={<DetailContent />} />
            <Route path='review-write/:placeId' element={<ReviewWrite />} />
          </Route>

          <Route path='map/search' element={<SearchPage />} />
          <Route path='mark' element={<></>} />
          <Route path='profile' element={<Profile />} />
          <Route path='related-sollect/:placeId' element={<RelatedSollect />} />
          <Route path=':loginType/callback' element={<OAuthCallback />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='/sollect/write/*' element={<SollectWriteLayout />}>
          <Route index element={<SollectWritePage />} />
          <Route path='place' element={<SollectWritePlacePage />} />
        </Route>
        <Route path='/map/reviews/:placeId' element={<ReviewsPage />} />
        <Route path='/sollect/write/search' element={<SearchPage />} />
      </Routes>
      {/* Modal Routes */}
      {modal && (
        <Routes>
          <Route path='/login-modal' element={<LoginModal />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
