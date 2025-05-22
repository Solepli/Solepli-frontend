import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '../../../api/reviewApi';
import Review from './Review';
import { ReviewType } from '../../../types';
import ShowAllReviewsButton from './ShowAllReviewsButton';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewEmoji from '../ReviewWrite/ReviewEmoji';
import XButton from '../../XButton';
import useAuthStore from '../../../store/authStore';
import useReviewWriteStore from '../../../store/reviewWriteStore';
import { useShallow } from 'zustand/shallow';

interface ReviewListProps {
  placeId: number;
  showAll?: boolean;
}

const ReviewList = ({ placeId, showAll = false }: ReviewListProps) => {
  const { data, isLoading, error } = useQuery<ReviewType[]>({
    queryKey: ['reviews', placeId],
    queryFn: () => fetchReviews(placeId),
  });
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { reset } = useReviewWriteStore(
    useShallow((state) => ({
      reset: state.reset,
    }))
  );
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생</p>;

  const reviewsToShow = showAll ? data : data?.slice(0, 5);

  const handleEmojiClick = () => {
    if (isLoggedIn) {
      navigate(`/map/review-write/${placeId}`, {
        state: { fromReviewList: showAll },
      });
    } else {
      reset();
      navigate(`/login-modal`, { state: { background: location } });
    }
  };

  return (
    <>
      {showAll ? (
        <div className='flex justify-end mb-2 px-16'>
          <XButton onClickFunc={() => navigate(-1)} />
        </div>
      ) : (
        <div className='h-40 border-t border-primary-100' />
      )}

      <div onClick={handleEmojiClick}>
        <ReviewEmoji />
      </div>

      {reviewsToShow && reviewsToShow.length === 0 ? (
        <div className='w-full h-40 pt-50 flex justify-center items-center'>
          <p className='text-primary-900 text-sm font-normal leading-[150%] text-center'>
            아직 리뷰가 없습니다.
            <br />
            소중한 후기를 공유해주세요!
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
