import React from 'react';
import ContentTitle from '../ContentTitle';
import ReviewRange from '../ReviewRange';
import TagList from '../TagList';
import PreviewPhotos from './PreviewPhotos';
import { useNavigate } from 'react-router-dom';
import { PreviewPlace } from '../../../types';

interface PreviewContentProps {
  place: PreviewPlace;
}

const PreviewContent: React.FC<PreviewContentProps> = ({ place }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/map/detail/${place.id}`, { state: { from: 'preview' } });
  };

  return (
    <div className='border-b border-primary-100 pt-12' onClick={handleClick}>
      {/* content title */}
      <ContentTitle previewPlace={place} property='preview' />

      {/* review range, place.rating이 Null이면 리뷰가 없다는 뜻임 */}
      <ReviewRange rating={place.rating} recommend={place.isSoloRecommended} hasReviews={place.rating !== null} />

      {/* tag list */}
      <TagList tags={place.tags} />

      {/* Preview photos */}
      <PreviewPhotos images={place.thumbnailUrls} />
    </div>
  );
};

export default PreviewContent;
