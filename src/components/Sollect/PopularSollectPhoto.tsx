import React from 'react';
import { SollectPhotoProps } from '../../interface';
import heart from '../../assets/heartFill.svg';
import locationWhite from "../../assets/locationWhite.svg"

const PopularSollectPhoto: React.FC<SollectPhotoProps> = ({ sollect }) => {
  return (
    <div
      className='relative w-350 h-430 rounded-lg overflow-hidden flex flex-col justify-end shrink-0' 
      style={{
        backgroundImage: `url(${sollect.imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}>
      <div className='bg-gradient-to-b from-black/0 to-black/75 absolute top-0 left-0 w-full h-full'></div>
      <div className='absolute top-12 right-12'>
        <img src={heart} alt='heart' className='w-24 h-24' />
      </div>

      <div className='p-24 z-1 text-white'>
        <h1 className='text-3xl font-bold pb-16'>{sollect.title}</h1>
        <div className='flex justify-between'>
          <span className='text-xs'>{sollect.placeTitle}</span>
          <span className='text-xs flex items-center'>
            <img src={locationWhite} alt="location" className='h-16 w-16'/>
            {sollect.address}</span>
        </div>
      </div>
    </div>
  );
};

export default PopularSollectPhoto;
