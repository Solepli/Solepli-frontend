import React, { useEffect } from 'react';
import ContentTitle from './ContentTitle';
import ReviewRange from './ReviewRange';
import TagList from './TagList';
import ReviewPhotos from './ReviewPhotos';
import ReviewList from './Review/ReviewList';
import { fetchPlaceById, getPlaceDetail } from '../../api/placeApi';
import { usePlaceStore } from '../../store/placeStore';
import { Link, useParams } from 'react-router-dom';
import arrow from '../../assets/arrow.svg';
import { useQuery } from '@tanstack/react-query';

const DetailContent: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();

  const { data } = useQuery({
    queryKey: ['placeDetail', placeId],
    queryFn: () => getPlaceDetail(parseInt(placeId!)),
    enabled: !!placeId,
  });

  // complete api: 마커 클릭시 해당 장소 상세정보 호출
  // complete api: 검색 결과에서 특정 장소 클릭시 상세 정보 호출
  useEffect(() => {
    console.log('placeDetail:', data);
  }, [data]);

  const { selectedPlace } = usePlaceStore();
  const counts = [2, 3, 1];

  const { setPlace } = usePlaceStore();

  const images = [
    'https://images.ctfassets.net/rric2f17v78a/1ql70crfzaiw9nFd58CZ7p/04652a19ab2fe5a5370d92c7957eb016/open-a-bakery-header.jpg',
    'https://i.namu.wiki/i/PgSYmu9y55E5YicKvIK14P0ttQUQG4ioSn-Fd6u27a0r2Jeu02fJAYRkmf2qtOb6fHLBnlrLeXu_gSESQbmykg.webp',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/cc/5b/8f/various-breads.jpg?w=800&h=-1&s=1',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvcP45F8yq6R7WMSjpuU0JAOh0foZEOSPr9g&s',
  ];

  useEffect(() => {
    if (placeId) {
      fetchPlaceById(parseInt(placeId)).then((fetchedPlace) => {
        setPlace(fetchedPlace);
      });
    }
  }, [placeId]);

  if (!selectedPlace) {
    return null;
  }

  return (
    <div>
      {/* ContentTitle */}
      <ContentTitle place={selectedPlace} property='detail' />

      {/* ReviewRange */}
      <ReviewRange rating={selectedPlace.rating} recommend={90} />

      {/* tags */}
      <div className='pb-12'>
        <TagList
          headerName='분위기'
          tags={selectedPlace.tags}
          counts={counts}
        />
        <TagList
          headerName='1인 이용'
          tags={selectedPlace.tags}
          counts={counts}
        />
      </div>

      {/* ReviewPhotoList */}
      <ReviewPhotos images={images} more />

      {/* 관련 쏠렉트 보기 */}
      <Link
        className='flex text-primary-950 text-xs pl-16 mb-12'
        to='/related-sollect'>
        관련 쏠렉트 보기 <img src={arrow} alt='arrow' />
      </Link>

      {/* ReviewList */}
      {placeId && (
        <ReviewList
          placeId={parseInt(placeId)}
          placeName={selectedPlace.title}
        />
      )}
    </div>
  );
};

export default DetailContent;
