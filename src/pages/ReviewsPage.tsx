import { useParams } from 'react-router-dom';
import ReviewList from '../components/BottomSheet/Review/ReviewList';

const ReviewsPage = () => {
  const { placeId } = useParams<{ placeId: string }>();

  if (!placeId) return <div>잘못된 접근입니다.</div>;

  return <ReviewList placeId={parseInt(placeId)} showAll />;
};

export default ReviewsPage;