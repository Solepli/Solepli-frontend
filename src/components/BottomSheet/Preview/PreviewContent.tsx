import React, { useMemo } from 'react';
import ContentTitle from '../ContentTitle';
import ReviewRange from '../ReviewRange';
import TagList from '../TagList';
import PreviewPhotos from './PreviewPhotos';
import { useNavigate } from 'react-router-dom';
import { PreviewPlace } from '../../../types';
import { useMarkerStore } from '../../../store/markerStore';
import { useMapStore } from '../../../store/mapStore';

interface PreviewContentProps {
  place: PreviewPlace;
}

const PreviewContent: React.FC<PreviewContentProps> = ({ place }) => {
  const navigate = useNavigate();
  const { markerInfos } = useMarkerStore();
  const { fitCenterLocation } = useMapStore();

  const { latitude, longitude } = useMemo(() => {
    const info = markerInfos.find((info) => info.id === place.id);
    return {
      latitude: info?.latitude ?? null,
      longitude: info?.longitude ?? null,
    };
  }, [markerInfos, place.id]);

  const handleClick = () => {
    if (latitude === null || longitude === null) {
      alert(
        `장소의 좌표 정보를 불러올 수 없어 지도를 이동할 수 없습니다.\n ${latitude} ${longitude}`
      );
      return;
    }
    fitCenterLocation(latitude, longitude);
    navigate(`/map/detail/${place.id}`, { state: { from: 'preview' } });
  };

  return (
    <div
      className='border-b border-primary-100 pt-12 button'
      onClick={handleClick}>
      {/* content title */}
      <ContentTitle previewPlace={place} property='preview' />

      {/* review range, place.rating이 Null이면 리뷰가 없다는 뜻임 */}
      <ReviewRange
        rating={place.rating}
        recommend={place.isSoloRecommended}
        hasReviews={place.rating !== null}
      />

      {/* tag list */}
      <TagList tags={place.tags} />

      {/* Preview photos */}
      <PreviewPhotos images={place.thumbnailUrls} />
    </div>
  );
};

export default PreviewContent;
