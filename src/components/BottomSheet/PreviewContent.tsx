import React from 'react'
import { Place } from '../../types';
import star from "../../assets/star.svg"
import ContentTitle from './ContentTitle';
import ReviewRange from './ReviewRange';

interface PreviewContentProps{
  place:Place
}

const PreviewContent:React.FC<PreviewContentProps> = ({place}) => {

  const images = [
    "https://images.ctfassets.net/rric2f17v78a/1ql70crfzaiw9nFd58CZ7p/04652a19ab2fe5a5370d92c7957eb016/open-a-bakery-header.jpg",
    "https://i.namu.wiki/i/PgSYmu9y55E5YicKvIK14P0ttQUQG4ioSn-Fd6u27a0r2Jeu02fJAYRkmf2qtOb6fHLBnlrLeXu_gSESQbmykg.webp",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/cc/5b/8f/various-breads.jpg?w=800&h=-1&s=1"
  ];


  return (
    <div className='border-b border-gray-100'>
      {/* content title */}
      <ContentTitle place={place} property='preview'/>

      {/* review range */}
      <ReviewRange rating={place.rating} recommend={90}/>

      {/* tag list */}
      <div className='flex mb-8 gap-4'>
        {place.tags.map((tag) => {
          return (
            <div
              className='bg-gray-100 ptb-4 px-8 py-4 text-xs font-light rounded-sm text-gray-900'
              key={tag}>
              #{tag}
            </div>
          );
        })}
      </div>

      {/* photos */}
      <div className='gap-2 grid grid-cols-3'>
        {images.map((image, i) => {
          return (
            <img
              src={image}
              alt=''
              className={`h-90 object-cover rounded-sm ${i === 0 ? 'rounded-tl-[20px]' : ''} ${i === 2 ? 'rounded-br-[20px]' : ''}`}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PreviewContent