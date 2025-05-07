import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '../../api/reviewApi';
import Review from './Review';
import { ReviewProps } from '../../types';

interface ReviewListProps {
  placeId: string;
}

const ReviewList = ({ placeId }: ReviewListProps) => {
  const { data, isLoading, error } = useQuery<ReviewProps[]>({
    queryKey: ['reviews', placeId],
    queryFn: () => fetchReviews(placeId),
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생</p>;

  return (
    <div>
      {data?.map((review: ReviewProps) => (
        <Review review={review} key={review.id} />
      ))}
    </div>
  );
};

export default ReviewList;