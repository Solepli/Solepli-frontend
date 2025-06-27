import React from 'react';
import { useSollectDetailStore } from '../../../store/sollectDetailStore';
import locationWhite from '../../../assets/locationWhite.svg';

const SollectDetailTitle = () => {
  const sollect = useSollectDetailStore();
  return (
    <div
      style={{
        backgroundImage: `url(${sollect.thumbnailImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className='w-full h-232 flex flex-col justify-end text-white relative'>
        
      {/* dim */}
      <div className='absolute bg-black/40 w-full h-full'></div>

      <div className='z-1 relative p-16'>
        <h1 className='text-2xl font-bold'>{sollect.title}</h1>
        <div className='text-xs flex justify-between'>
          <span className='text-xs'>
            {' '}
            {sollect.placeName}
            {sollect.otherPlaceCount > 0 && `(외 ${sollect.otherPlaceCount}곳)`}
          </span>
          <span className='text-xs flex items-center'>
            <img src={locationWhite} alt='location' className='h-16 w-16' />
            {sollect.district}, {sollect.neighborhood}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SollectDetailTitle;
