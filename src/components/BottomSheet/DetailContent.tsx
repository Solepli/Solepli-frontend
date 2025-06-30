import React, { useEffect } from 'react';
import ContentTitle from './ContentTitle';
import ReviewRange from './ReviewRange';
import TagList from './TagList';
import ReviewPhotos from './ReviewPhotos';
import ReviewList from './Review/ReviewList';
import { getPlaceDetail } from '../../api/placeApi';
import { usePlaceStore } from '../../store/placeStore';
import { Link, useParams } from 'react-router-dom';
import arrow from '../../assets/arrow.svg';
import { useQuery } from '@tanstack/react-query';

const DetailContent: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
    const { selectedPlace, setPlace } = usePlaceStore();


  const { data } = useQuery({
    queryKey: ['placeDetail', placeId],
    queryFn: () => getPlaceDetail(parseInt(placeId!)),
    enabled: !!placeId,
  });

  // complete api: 마커 클릭시 해당 장소 상세정보 호출
  // complete api: 검색 결과에서 특정 장소 클릭시 상세 정보 호출
  useEffect(() => {
    if(data){
      console.log('placeDetail:', data);
      setPlace(data.place);
    }
  }, [data]);


  if (!selectedPlace) {
    return null;
  }

  return (
    <div>
      {/* ContentTitle */}
      <ContentTitle place={selectedPlace} property='detail' />

      {/* ReviewRange */}
      <ReviewRange rating={selectedPlace.rating} recommend={selectedPlace.isSoloRecommended} />

      {/* tags */}
      <div className='pb-12'>
        <TagList
          headerName='분위기'
          detailTags={selectedPlace.tags.mood}
        />
        <TagList
          headerName='1인 이용'
          detailTags={selectedPlace.tags.solo}
        />
      </div>

      {/* ReviewPhotoList */}
      <ReviewPhotos images={selectedPlace.thumbnailUrl} more />

      {/* 관련 쏠렉트 보기 */}
      <Link
        className='flex text-primary-950 text-xs pl-16 mb-12'
        to={`/related-sollect/${placeId}`}>
        관련 쏠렉트 보기 <img src={arrow} alt='arrow' />
      </Link>

      {/* ReviewList */}
      
      {placeId && (
        <ReviewList
          placeId={parseInt(placeId)}
          placeName={selectedPlace.name}
        />
      )}
    </div>
  );
};

export default DetailContent;
