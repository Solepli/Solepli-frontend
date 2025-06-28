import React, { useState } from 'react';
import locationWhite from '../../assets/locationWhite.svg';
import SollectMark from './SollectMark';
import { SollectPhotoType } from '../../types';
import { useNavigate } from 'react-router-dom';

interface PopularSollectProps {
  sollect: SollectPhotoType;
  center: boolean;
}

const PopularSollectPhoto: React.FC<PopularSollectProps> = ({
  sollect,
  center,
}) => {
  const navigate = useNavigate();
  const [marked, setMarked] = useState(false);

  const handleClick = () =>{
       navigate(`/sollect/${sollect.sollectId}`);
  }
  return (
    // TODO: onClick 조회 이벤트 필요
    <div
      className={`relative rounded-lg overflow-hidden flex flex-col justify-end shrink-0 ${center ? 'w-350 h-430' : 'w-320 h-390'}`}
      style={{
        backgroundImage: `url(${sollect.thumbnailImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      onClick={handleClick}
      >
      {/* background */}
      <div className='bg-gradient-to-b from-black/0 to-black/75 absolute top-0 left-0 w-full h-full'></div>

      {/* Sollect Mark */}
      <div className='absolute top-12 right-12' onClick={(e) => e.stopPropagation()}>
        <SollectMark marked={marked} setMarked={setMarked} id={sollect.sollectId} />
      </div>

      {/* text */}
      <div className='p-24 z-1 text-white'>
        <h1 className='text-3xl font-bold pb-16'>{sollect.title}</h1>
        <div className='flex justify-between'>
          <span className='text-xs'>{sollect.placeName}</span>
          <span className='text-xs flex items-center'>
            <img src={locationWhite} alt='location' className='h-16 w-16' />
            {sollect.district}, {sollect.neighborhood}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopularSollectPhoto;
