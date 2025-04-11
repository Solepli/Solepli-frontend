import React, { useState } from 'react'
import { Place } from '../../types';
import SolmarkChip from './SolmarkChip';

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
    <div className='p-16 pt-14 border-b border-gray-100'>
      {/* content title */}
      <div className='flex justify-between pb-8'>
        <div className='inline-flex items-center'>
          <span className='text-base text-gray-900 font-bold pr-4'>
            {place.title}
          </span>
          <span className='text-xs text-gray-400 pr-10'>
            {place.category.title}
          </span>
          <span className='text-xs text-gray-900 font-semibold'>영업 중</span>
        </div>

        <SolmarkChip/>
      </div>

      {/* review range */}
      <div className='flex justify-between items-center pb-4'>
        <div>
          <p className='text-xs text-gray-900 font-medium mb-2'>90% 추천</p>
          <div>
            <div className='w-130 h-6 relative bg-gray-200 rounded-tl-sm rounded-br-sm'>
              <div className='absolute w-100 h-6 bg-green-700 rounded-tl-sm rounded-br-sm'></div>
            </div>
          </div>
        </div>
        {/* 별점 */}
        <div className='flex items-center pt-4'>
          <div className='bg-gray-100 w-20 h-20'></div>
          <p>4.5</p>
        </div>
      </div>

      {/* tag list */}
      <div className='flex mb-8 gap-4'>
        {place.tags.map((tag) => {
          return (
            <div
              className='bg-gray-100 ptb-4 px-8 py-4 text-xs font-light rounded-sm'
              key={tag}>
              #{tag}
            </div>
          );
        })}
      </div>

      {/* photos */}
      <div className='flex gap-2 grid grid-cols-3'>
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