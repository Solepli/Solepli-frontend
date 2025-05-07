import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '../../../api/reviewApi';
import Review from './Review';
import { ReviewProps } from '../../../types';
import ShowAllReviewsButton from './ShowAllReviewsButton';
import { useNavigate } from 'react-router-dom';

interface ReviewListProps {
  placeId: string;
  showAll?: boolean; 
}

const ReviewList = ({ placeId, showAll = false }: ReviewListProps) => {
  const { data, isLoading, error } = useQuery<ReviewProps[]>({
    queryKey: ['reviews', placeId],
    queryFn: () => fetchReviews(placeId),
  });
  const navigate = useNavigate();

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생</p>;

  const reviewsToShow = showAll ? data : data?.slice(0, 5);

  return (
    <div>
      {reviewsToShow?.map((review: ReviewProps) => (
        <Review review={review} key={review.id} />
      ))}
      {!showAll && <ShowAllReviewsButton onClick={() => navigate(`/reviews/${placeId}`)}/>}
    </div>
  );
};

export default ReviewList;
