import React from 'react';
import { SollectPhotoProps } from '../../interface';
import heart from '../../assets/heartFill.svg';
import { useNavigate } from 'react-router-dom';

const SollectPhoto: React.FC<SollectPhotoProps> = ({ sollect }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('');
  };
  return (
    <div
      onClick={handleClick}
      className='relative w-174 h-220 rounded-lg overflow-hidden flex flex-col justify-end'
      style={{
        backgroundImage: `url(${sollect.imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}>
      <div className='bg-gradient-to-b from-black/0 to-black/75 absolute top-0 left-0 w-full h-full'></div>
      <div className='absolute top-8 right-8'>
        <img src={heart} alt='heart' className='w-24 h-24' />
      </div>
      <div className='p-20 z-1 text-white'>
        <p className='text-sm font-bold pb-4'>{sollect.title}</p>
        <p className='text-xs'>{sollect.address}</p>
      </div>
    </div>
  );
};

export default SollectPhoto;
