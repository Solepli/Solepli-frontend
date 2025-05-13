import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '../../../api/reviewApi';
import Review from './Review';
import { ReviewType } from '../../../types';
import ShowAllReviewsButton from './ShowAllReviewsButton';
import { useNavigate } from 'react-router-dom';
import ReviewEmoji from '../ReviewWrite/ReviewEmoji';
import XButton from '../../XButton';

interface ReviewListProps {
  placeId: string;
  showAll?: boolean;
}

const ReviewList = ({ placeId, showAll = false }: ReviewListProps) => {
  const { data, isLoading, error } = useQuery<ReviewType[]>({
    queryKey: ['reviews', placeId],
    queryFn: () => fetchReviews(placeId),
  });
  const navigate = useNavigate();

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생</p>;

  const reviewsToShow = showAll ? data : data?.slice(0, 5);

  return (
    <>
      {showAll ? (
        <div className='flex justify-end mb-2 px-16'>
          <XButton onClickFunc={() => navigate(-1)} />
        </div>
      ) : (
        <div className='h-40 border-t border-primary-100' />
      )}
      <ReviewEmoji />

      {reviewsToShow && reviewsToShow.length === 0 ? (
        <div className='w-full h-40 pt-50 flex justify-center items-center'>
          <p className='text-primary-400 text-xs font-normal leading-relaxed text-center'>
          아직 리뷰가 없습니다. <br />
          소중한 리뷰를 남겨주세요!
          </p>
        </div>
      ) : (
        <>
          {reviewsToShow?.map((review: ReviewType) => (
            <Review review={review} key={review.id} />
          ))}
          {!showAll && (
            <ShowAllReviewsButton
              onClick={() => navigate(`/map/reviews/${placeId}`)}
            />
          )}
        </>
      )}
    </>
  );
};

export default ReviewList;
