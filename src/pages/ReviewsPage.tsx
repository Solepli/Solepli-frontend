import { useNavigate, useParams } from 'react-router-dom';
import { usePlaceStore } from '../store/placeStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getReviews } from '../api/reviewApi';
import { useScrollSentinel } from '../hooks/useInfiniteScrollQuery';
import Review from '../components/BottomSheet/Review/Review';
import TitleHeader from '../components/global/TitleHeader';
import ReviewWriteTriggerEmoji from '../components/BottomSheet/ReviewWrite/ReviewWriteTriggerEmoji';

const ReviewsPage = () => {
  const { placeId } = useParams<{ placeId: string }>();
  //TODO:: 장소 이름 api 받아서 사용할 것
  const { selectedPlace } = usePlaceStore();
  const navigate = useNavigate();

  // useInfiniteQuery를 통한 무한 스크롤 구현
  // pageParam이 cursorId 역할을 한다. 초기값은 undefined
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['getAllReviews'],
      queryFn: ({ pageParam = undefined }) =>
        getReviews(parseInt(placeId ?? '1'), pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
      initialPageParam: undefined,
    });

  // 데이터 합침
  const reviews = data ? data.pages.map((page) => page.reviews).flat() : [];

  // sentinelRef div가 뷰포트에 들어오면 다음 페이지 fetch
  // 스크롤 끝까지 했는지 sentinel 감시
  const sentinelRef = useScrollSentinel({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div className='relative'>
      <TitleHeader
        title={selectedPlace?.name ?? ''}
        onClick={() => {
          navigate(`/map/detail/${placeId}`);
        }}
      />
      <div className='mt-58 mb-32'>
        <ReviewWriteTriggerEmoji
          placeId={parseInt(placeId ?? '')}
          placeName={selectedPlace?.name ?? ''}
          pt={20}
        />
        {reviews.map((review) => (
          <Review review={review} key={review.nickName + review.createdAt} />
        ))}
        <div ref={sentinelRef} style={{ height: '1px' }} />
        {isFetchingNextPage && (
          <div className='text-center py-4'>로딩 중...</div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
