import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '../../../api/reviewApi';
import Review from './Review';
import { ReviewType } from '../../../types';
import ShowAllReviewsButton from './ShowAllReviewsButton';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewEmoji from '../ReviewWrite/ReviewEmoji';
import useAuthStore from '../../../store/authStore';
import useReviewWriteStore from '../../../store/reviewWriteStore';
import { useShallow } from 'zustand/shallow';
import { useCallback } from 'react';
import TitleHeader from '../../global/TitleHeader';

interface ReviewListProps {
  placeId: number;
  placeName: string;
  showAll?: boolean;
}

const ReviewList = ({
  placeId,
  placeName,
  showAll = false,
}: ReviewListProps) => {
  const selectSortedReviews = useCallback((data: ReviewType[]) => {
    const sortByDate = (a: ReviewType, b: ReviewType) => {
      const dateA = new Date('20' + a.date.split('.').join('-'));
      const dateB = new Date('20' + b.date.split('.').join('-'));
      return dateB.getTime() - dateA.getTime();
    };
    return data.sort(sortByDate);
  }, []);

  const { data, isLoading, error } = useQuery<ReviewType[]>({
    queryKey: ['reviews', placeId],
    queryFn: () => fetchReviews(placeId),
    select: selectSortedReviews,
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

  // 디테일 페이지에선 5개 리뷰만 보여주고, 더보기 버튼을 클릭시 모든 리뷰를 보여줌
  const reviewsToShow = showAll ? data : data?.slice(0, 5);

  const handleEmojiClick = () => {
    if (isLoggedIn) {
      navigate(`/map/review-write/${placeId}`, {
        state: { place: placeName },
      });
    } else {
      reset();
      navigate(`/login-modal`, { state: { background: location } });
    }
  };

  return (
    <>
      {showAll ? (
        <TitleHeader
          title={placeName}
          onClick={() => {
            navigate(`/map/detail/${placeId}`);
          }}
        />
      ) : (
        <div className='h-40 border-t border-primary-100' />
      )}

      <div onClick={handleEmojiClick} className={showAll ? 'pt-78' : ''}>
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
              onClick={() =>
                navigate(`/map/reviews/${placeId}`, { state: { placeName } })
              }
            />
          )}
        </>
      )}
    </>
  );
};

export default ReviewList;
