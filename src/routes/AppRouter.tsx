import { Location, Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import Solmap from '../pages/Solmap';
import CategoryButtonList from '../components/BottomSheet/Category/CategoryButtonList';
import PreviewContentList from '../components/BottomSheet/Preview/PreviewContentList';
import DetailContent from '../components/BottomSheet/DetailContent';
import ReviewsPage from '../pages/ReviewsPage';
import PreviewContentEmpty from '../components/BottomSheet/Preview/PreviewContentEmpty';
import ReviewWrite from '../pages/ReviewWritePage';
import LoginModal from '../auth/LoginModal';
import RelatedSollect from '../pages/RelatedSollect';
import SollectPage from '../pages/SollectPage';
import SearchPage from '../pages/SearchPage';
import SollectSearchResultPage from '../pages/SollectSearchResultPage';
import OAuthCallback from '../auth/OAuthCallback';
import Login from '../pages/Login';
import SollectWritePage from '../pages/SollectWritePage';
import SollectWriteLayout from '../layout/SollectWriteLayout';
import SollectWritePlacePage from '../pages/SollectWritePlacePage';
import SollectDetailPage from '../pages/SollectDetailPage';
import SolrouteWritePage from '../pages/solroute/SolrouteWritePage';
import SolmarkPage from '../pages/SolmarkPage';
import SolmarkContentPlace from '../components/Solmark/SolmarkContentPlace';
import SolmarkPlacePreviewPage from '../pages/SolmarkPlacePreviewPage';
import SolmarkContentSollect from '../components/Solmark/SolmarkContentSollect';
import SolmarkContentMy from '../components/Solmark/SolmarkContentMy';
import SolroutePlaceAddLayout from '../layout/SolroutePlaceAddLayout';
import SolroutePlaceAddPage from '../pages/solroute/SolroutePlaceAddPage';
import SolroutePage from '../pages/solroute/SolroutePage';
import SolrouteDetailPage from '../pages/solroute/SolrouteDetailPage';
import ProfileEditPage from '../pages/profile/ProfileEditPage';
import Profile from '../pages/profile/Profile';
import AnnouncementPage from '../pages/profile/AnnouncementPage';
import AnnouncementDetailPage from '../pages/profile/AnnouncementDetailPage';
import FeedbackPage from '../pages/profile/FeedbackPage';


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

          <Route path='map' element={<Solmap />}>
            <Route index element={<CategoryButtonList />} />
            <Route path='list' element={<PreviewContentList />} />
            <Route path='not-found' element={<PreviewContentEmpty />} />
            <Route path='detail/:placeId' element={<DetailContent />} />
          </Route>

          <Route path='map/search' element={<SearchPage />} />

          <Route path='solroute' element={<SolroutePage />} />

          <Route path='mark' element={<SolmarkPage />}>
            <Route index element={<SolmarkContentPlace />} />
            <Route path='place' element={<SolmarkContentPlace />} />
            <Route path='sollect' element={<SolmarkContentSollect />} />
            <Route path='my' element={<SolmarkContentMy />} />
          </Route>

          <Route path='profile' element={<Profile />} />
          <Route path=':loginType/callback' element={<OAuthCallback />} />
        </Route>

        {/* BottomNav 없어야 하는 곳 */}
        <Route path='login' element={<Login />} />
        <Route path='/sollect/write/*' element={<SollectWriteLayout />}>
          <Route index element={<SollectWritePage />} />
          <Route path='place' element={<SollectWritePlacePage />} />
        </Route>

        <Route path='sollect/:sollectId' element={<SollectDetailPage />} />
        <Route path='related-sollect/:placeId' element={<RelatedSollect />} />
        <Route path='/map/review/write/:placeId' element={<ReviewWrite />} />
        <Route path='/map/reviews/:placeId' element={<ReviewsPage />} />
        <Route path='/sollect/write/search' element={<SearchPage />} />

        <Route path='/solroute/:solrouteId' element={<SolrouteDetailPage />} />
        <Route path='/solroute/write' element={<SolrouteWritePage />} />
        <Route path='/solroute/write/search' element={<SearchPage />} />
        <Route
          path='/solroute/place/list/:collectionId'
          element={<SolmarkPlacePreviewPage />}
        />
        <Route path='/solroute/add/place' element={<SolroutePlaceAddLayout />}>
          <Route index element={<SolroutePlaceAddPage />} />
        </Route>

        <Route
          path='mark/place/list/:collectionId'
          element={<SolmarkPlacePreviewPage />}
        />
        <Route
          path='/solroute/place/list/:collectionId'
          element={<SolmarkPlacePreviewPage />}
        />
        <Route path='/solroute/add/place' element={<SolroutePlaceAddLayout />}>
          <Route index element={<SolroutePlaceAddPage />} />
        </Route>

        <Route path='/profile/edit' element={<ProfileEditPage />} />
        <Route path='/profile/announcement' element={<AnnouncementPage />} />
        <Route path='/profile/announcement/:announcementId' element={<AnnouncementDetailPage />} />
        <Route path='/profile/feedback' element={<FeedbackPage />} />
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
