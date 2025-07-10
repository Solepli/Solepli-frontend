import React, { useEffect, useState } from 'react';
import ContentTitle from './ContentTitle';
import ReviewRange from './ReviewRange';
import TagList from './TagList';
import ReviewPhotos from './ReviewPhotos';
import { getPlaceDetail } from '../../api/placeApi';
import { usePlaceStore } from '../../store/placeStore';
import { Link, useParams } from 'react-router-dom';
import arrow from '../../assets/arrow.svg';
import { useQuery } from '@tanstack/react-query';
import ReviewWriteTriggerEmoji from './ReviewWrite/ReviewWriteTriggerEmoji';
import DetailContentReviewResult from './DetailContentReviewResult';

const NoReviewResult: React.FC = () => {
  return (
    <div className='w-full h-40 pt-50 flex justify-center items-center'>
      <p className='text-primary-900 text-sm font-normal leading-[150%] text-center'>
        아직 리뷰가 없습니다.
        <br />
        소중한 후기를 공유해주세요!
      </p>
    </div>
  );
};

const DetailContent: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const { selectedPlace, setPlace } = usePlaceStore();

  const { data, isLoading } = useQuery({
    queryKey: ['placeDetail', placeId],
    queryFn: () => getPlaceDetail(parseInt(placeId!)),
    enabled: !!placeId,
  });

  const[more, setMore] = useState(false);

  // complete api: 마커 클릭시 해당 장소 상세정보 호출
  // complete api: 검색 결과에서 특정 장소 클릭시 상세 정보 호출
  useEffect(() => {
    if (data) {
      console.log('placeDetail:', data);
      setPlace(data.place);
      setMore(data.place.thumbnailUrl.length >= 6);
    }
  }, [data]);

  if (!selectedPlace) {
    return null;
  }

  //data 값이 없으면 data.review에서 오류나기에 data 값을 받아올 동안 ...을 반환
  if (isLoading) {
    return <>...</>;
  }

  const hasReviews = data.reviews.length !== 0;

  return (
    <div>
      {/* ContentTitle */}
      <ContentTitle detailPlace={selectedPlace} property='detail' />

      {/* ReviewRange */}
      <ReviewRange
        rating={selectedPlace.rating}
        recommend={selectedPlace.isSoloRecommended}
        hasReviews={hasReviews}
      />

      {/* tags */}
      <div className='pb-12'>
        <TagList headerName='분위기' detailTags={selectedPlace.tags.mood} />
        <TagList headerName='1인 이용' detailTags={selectedPlace.tags.solo} />
      </div>

      {/* ReviewPhotoList */}
      <ReviewPhotos images={selectedPlace.thumbnailUrl} more={more} />

      {/* 관련 쏠렉트 보기 */}
      <Link
        className='flex text-primary-950 text-xs pl-16 pb-12 border-b border-primary-100'
        to={`/related-sollect/${placeId}`}>
        관련 쏠렉트 보기 <img src={arrow} alt='arrow' />
      </Link>

      {/* 이모지 컴포넌트 클릭시 리뷰 작성으로 넘어감*/}
      <ReviewWriteTriggerEmoji
        placeId={selectedPlace.id}
        placeName={selectedPlace.name}
      />

      {/* ReviewList */}
      {hasReviews ? (
        <DetailContentReviewResult reviews={data.reviews} />
      ) : (
        <NoReviewResult />
      )}
    </div>
  );
};

export default DetailContent;
