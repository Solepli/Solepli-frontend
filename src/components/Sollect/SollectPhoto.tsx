import React, { useState } from 'react';
import { SollectPhotoProps } from '../../interface';
import { useNavigate } from 'react-router-dom';
import SollectMark from './SollectMark';

type Props = SollectPhotoProps &{
  isMine?:boolean;
}

const SollectPhoto: React.FC<Props> = ({ sollect, isMine }) => {
  const navigate = useNavigate();
  const [marked, setMarked] = useState(sollect.isMarked);

  const handleClick = () => {
    navigate(`/sollect/${sollect.sollectId}`);
  };

  return (
    <div
      onClick={handleClick}
      className='relative w-174 h-220 rounded-lg overflow-hidden flex flex-col justify-end shrink-0'
      style={{
        backgroundImage: `url(${sollect.thumbnailImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}>
      {/* background */}
      <div className='bg-gradient-to-b from-black/0 to-black/75 absolute top-0 left-0 w-full h-full'></div>

      {/* Sollect Mark */}
      <div
        className='absolute top-8 right-8'
        onClick={(e) => e.stopPropagation()}>
        {isMine ? (
          <></>
        ) : (
          <SollectMark
            marked={marked}
            setMarked={setMarked}
            id={sollect.sollectId}
          />
        )}
      </div>

      <div className='p-20 z-1 text-white'>
        <p className='text-sm font-bold pb-4'>{sollect.title}</p>
        <p className='text-xs'>
          {sollect.district}, {sollect.neighborhood}
        </p>
      </div>
    </div>
  );
};

export default SollectPhoto;
