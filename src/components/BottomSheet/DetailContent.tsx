import React from 'react';
import ContentTitle from './ContentTitle';
import { places } from '../../places';
import ReviewRange from './ReviewRange';
import TagList from './TagList';
import ReviewPhotos from './ReviewPhotos';
import ReviewList from './Review/ReviewList';

const DetailContent: React.FC = () => {
  const place = places[0];
  const tags1 = [
      { id: 'quiet', text: '조용한' },
      { id: 'lively', text: '시끌벅적한' },
      { id: 'cozy', text: '편안한' },
    ];
  const tags2 = [
      { id: 'luxurious', text: '고급스러운' },
      { id: 'unique', text: '색다른' },
      { id: 'hip', text: '힙한' },
    ];
  const counts = [2, 3, 1];

  const images = [
    'https://images.ctfassets.net/rric2f17v78a/1ql70crfzaiw9nFd58CZ7p/04652a19ab2fe5a5370d92c7957eb016/open-a-bakery-header.jpg',
    'https://i.namu.wiki/i/PgSYmu9y55E5YicKvIK14P0ttQUQG4ioSn-Fd6u27a0r2Jeu02fJAYRkmf2qtOb6fHLBnlrLeXu_gSESQbmykg.webp',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/cc/5b/8f/various-breads.jpg?w=800&h=-1&s=1',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvcP45F8yq6R7WMSjpuU0JAOh0foZEOSPr9g&s'
  ];

  return (
    <div>
      {/* ContentTitle */}
      <ContentTitle place={place} property='detail' />

      {/* ReviewRange */}
      <ReviewRange rating={place.rating} recommend={90} />

      {/* tags */}
      <div className='pb-12'>
        <TagList headerName='분위기' tags={tags1} counts={counts} />
        <TagList headerName='1인 이용' tags={tags2} counts={counts} />
      </div>

      {/* ReviewPhotoList */}
      <ReviewPhotos images={images} />

      {/* ReviewList */}
      <ReviewList placeId={place.title} />
    </div>
  );
};

export default DetailContent;
