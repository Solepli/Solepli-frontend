import React from 'react'
import { Place } from '../../../types';
import ContentTitle from '../ContentTitle';
import ReviewRange from '../ReviewRange';
import TagList from '../TagList';
import PreviewPhotos from './PreviewPhotos';
import { useNavigate } from 'react-router-dom';

interface PreviewContentProps{
  place:Place
}

const PreviewContent:React.FC<PreviewContentProps> = ({place}) => {
  const navigate = useNavigate();

  const images = [
    "https://images.ctfassets.net/rric2f17v78a/1ql70crfzaiw9nFd58CZ7p/04652a19ab2fe5a5370d92c7957eb016/open-a-bakery-header.jpg",
    "https://i.namu.wiki/i/PgSYmu9y55E5YicKvIK14P0ttQUQG4ioSn-Fd6u27a0r2Jeu02fJAYRkmf2qtOb6fHLBnlrLeXu_gSESQbmykg.webp",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/cc/5b/8f/various-breads.jpg?w=800&h=-1&s=1"
  ];

  const handleClick = ()=>{
    navigate(`/map/detail/${place.id}`, { state: { from: 'preview' } });
  } 

  return (
    <div className='border-b border-primary-100 pt-12' onClick={handleClick}>
      {/* content title */}
      <ContentTitle place={place} property='preview'/>

      {/* review range */}
      <ReviewRange rating={place.rating} recommend={place.isSoloRecommended}/>

      {/* tag list */}
      <TagList tags={place.tags}/>

      {/* Preview photos */}
      <PreviewPhotos images={images}/>
      
    </div>
  );
}

export default PreviewContent